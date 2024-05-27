package logic

import (
	"context"
	"fmt"
	"html"
	database "offer_service/internal/dataaccess/db"
	offer_servicev1 "offer_service/internal/generated/offer_service/v1"
	"offer_service/internal/handlers/s3"
	"offer_service/internal/pkg/common"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"
	"time"

	"strings"

	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	CompanyProfileImageObjectName = "company_profile_image"
	OfferImageObjectName          = "offer_image"
)

type CreateCompanyParams struct {
	CompanyName    string
	ProfileImageID uint64
}

type CreateCompanyOutput struct {
	Company offer_servicev1.Company
}

type UpdateCompanyParams struct {
	CompanyID      uint64
	CompanyName    string
	ProfileImageID uint64
}

type UpdateCompanyOutput struct {
	Company offer_servicev1.Company
}

type CreateCompanyProfileImageOutput struct {
	CompanyProfileImage offer_servicev1.CompanyProfileImage
}

type CreateOfferImageOutput struct {
	OfferImage offer_servicev1.OfferImage
}

type OfferManagement interface {
	CreateCompany(context.Context, CreateCompanyParams) (*CreateCompanyOutput, error)
	UpdateCompany(context.Context, UpdateCompanyParams) (*UpdateCompanyOutput, error)
	CreateCompanyProfileImage(context.Context) (*CreateCompanyProfileImageOutput, error)
	CreateOfferImage(context.Context) (*CreateOfferImageOutput, error)
}

type offerManagement struct {
	config               configs.Config
	s3Client             s3.Client
	companyAccessor      database.CompanyAccessor
	companyImageAccessor database.CompanyProfileImageAccessor
	offerImageAccessor   database.OfferImageAccessor
	logger               *zap.Logger
	idGenerator          common.IDGenerator
}

func NewOfferManagement(
	config configs.Config,
	s3Client s3.Client,
	companyAccessor database.CompanyAccessor,
	companyImageAccessor database.CompanyProfileImageAccessor,
	offerImageAccessor database.OfferImageAccessor,
	logger *zap.Logger,
	idGenerator common.IDGenerator,
) (OfferManagement, error) {
	if createCompanyProfileImageBucketErr := s3Client.CreateBucketIfNotExists(
		context.Background(),
		config.GRPC.CreateCompanyProfileImage.BucketName,
		config.GRPC.CreateCompanyProfileImage.Location,
	); createCompanyProfileImageBucketErr != nil {
		logger.With(zap.Error(createCompanyProfileImageBucketErr)).
			Error("failed to create company profile image bucket")
		return nil, createCompanyProfileImageBucketErr
	}

	if createOfferImageBucketErr := s3Client.CreateBucketIfNotExists(
		context.Background(),
		config.GRPC.CreateOfferImage.BucketName,
		config.GRPC.CreateOfferImage.Location,
	); createOfferImageBucketErr != nil {
		logger.With(zap.Error(createOfferImageBucketErr)).
			Error("failed to create offer image bucket")
		return nil, createOfferImageBucketErr
	}

	return &offerManagement{
		config:               config,
		s3Client:             s3Client,
		companyAccessor:      companyAccessor,
		companyImageAccessor: companyImageAccessor,
		offerImageAccessor:   offerImageAccessor,
		logger:               logger,
		idGenerator:          idGenerator,
	}, nil
}

func (o offerManagement) generateImagePutPresignURL(
	ctx context.Context,
	objectName,
	bucketName string,
	expireTime time.Duration,
) (string, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("generateImagePresignURL")

	presignPutURL, presignErr := o.s3Client.GeneratePresignedUploadURL(
		ctx,
		bucketName,
		objectName,
		expireTime,
	)

	if presignErr != nil {
		logger.With(zap.Error(presignErr)).Error("failed to presign image url")
		return "", presignErr
	}

	return presignPutURL, nil
}

func (o offerManagement) getCompanyProfileImageObjectName(id uint64) string {
	return fmt.Sprintf("%s_%d", CompanyProfileImageObjectName, id)
}

//nolint:dupl // disable this lint because it raised false positive check.
func (o offerManagement) CreateCompanyProfileImage(
	ctx context.Context,
) (*CreateCompanyProfileImageOutput, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("CreateCompanyProfileImage")

	expireTime, parseExpireTimeErr := time.ParseDuration(
		o.config.GRPC.CreateCompanyProfileImage.PresignURLExpiryTime,
	)
	if parseExpireTimeErr != nil {
		logger.With(zap.Error(parseExpireTimeErr)).
			Error("failed to parse expire time for presign to create company image url")
		return &CreateCompanyProfileImageOutput{}, status.Error(
			codes.Internal,
			parseExpireTimeErr.Error(),
		)
	}

	id := o.idGenerator.GenerateID()
	objName := o.getCompanyProfileImageObjectName(id)

	companyProfileImage := &database.CompanyProfileImage{
		ID:         id,
		ObjectName: objName,
		ExpireTime: expireTime,
	}

	presignPutURL, presignPutURLErr := o.generateImagePutPresignURL(
		ctx,
		companyProfileImage.ObjectName,
		o.config.GRPC.CreateCompanyProfileImage.BucketName,
		companyProfileImage.ExpireTime,
	)

	if presignPutURLErr != nil {
		logger.With(zap.Error(presignPutURLErr)).
			Error("failed to generate put presign create company profile image")
		return &CreateCompanyProfileImageOutput{}, status.Error(
			codes.Internal,
			presignPutURLErr.Error(),
		)
	}

	if dbErr := o.companyImageAccessor.CreateCompanyProfileImage(ctx, companyProfileImage); dbErr != nil {
		logger.With(zap.Error(dbErr)).Error("failed to create company image")
		return &CreateCompanyProfileImageOutput{}, status.Error(codes.Internal, dbErr.Error())
	}

	return &CreateCompanyProfileImageOutput{
		CompanyProfileImage: offer_servicev1.CompanyProfileImage{
			Id:            companyProfileImage.ID,
			PresignPutUrl: presignPutURL,
		},
	}, nil
}

func (o offerManagement) getOfferImageObjectName(id uint64) string {
	return fmt.Sprintf("%s_%d", OfferImageObjectName, id)
}

//nolint:dupl // disable this lint because it raised false positive check.
func (o offerManagement) CreateOfferImage(ctx context.Context) (*CreateOfferImageOutput, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("CreateOfferImage")

	expireTime, parseExpireTimeErr := time.ParseDuration(
		o.config.GRPC.CreateOfferImage.PresignURLExpiryTime,
	)
	if parseExpireTimeErr != nil {
		logger.With(zap.Error(parseExpireTimeErr)).
			Error("failed to parse expire time for presign to create offer image url")
		return &CreateOfferImageOutput{}, status.Error(
			codes.Internal,
			parseExpireTimeErr.Error(),
		)
	}

	id := o.idGenerator.GenerateID()
	objName := o.getOfferImageObjectName(id)

	offerImage := &database.OfferImage{
		ID:         id,
		ObjectName: objName,
		ExpireTime: expireTime,
	}

	presignPutURL, presignPutURLErr := o.generateImagePutPresignURL(
		ctx,
		offerImage.ObjectName,
		o.config.GRPC.CreateOfferImage.BucketName,
		offerImage.ExpireTime,
	)

	if presignPutURLErr != nil {
		logger.With(zap.Error(presignPutURLErr)).
			Error("failed to generate put presign create offer image")
		return &CreateOfferImageOutput{}, status.Error(
			codes.Internal,
			presignPutURLErr.Error(),
		)
	}

	if dbErr := o.offerImageAccessor.CreateOfferImage(ctx, offerImage); dbErr != nil {
		logger.With(zap.Error(dbErr)).Error("failed to create offer image")
		return &CreateOfferImageOutput{}, status.Error(codes.Internal, dbErr.Error())
	}

	return &CreateOfferImageOutput{
		OfferImage: offer_servicev1.OfferImage{
			Id:            offerImage.ID,
			PresignPutUrl: presignPutURL,
		},
	}, nil
}

func (o offerManagement) getSanitizedCompanyName(name string) string {
	trimmedNamed := strings.TrimSpace(name)
	escapedName := html.EscapeString(trimmedNamed)
	return escapedName
}

func (o offerManagement) CreateCompany(
	ctx context.Context,
	params CreateCompanyParams,
) (*CreateCompanyOutput, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("CreateCompany")

	sanitizedCompanyName := o.getSanitizedCompanyName(params.CompanyName)

	company := &database.Company{
		ID:             o.idGenerator.GenerateID(),
		Name:           sanitizedCompanyName,
		NameLowerCase:  strings.ToLower(sanitizedCompanyName),
		ProfileImageID: params.ProfileImageID,
	}

	if dbErr := o.companyAccessor.CreateCompany(ctx, company); dbErr != nil {
		logger.With(zap.Error(dbErr)).Error("failed to create company")
		return &CreateCompanyOutput{}, status.Error(codes.Internal, dbErr.Error())
	}

	return &CreateCompanyOutput{
		Company: offer_servicev1.Company{
			Id:              company.ID,
			Name:            company.Name,
			ProfileImageUrl: o.getCompanyProfileImageObjectName(company.ID),
		},
	}, nil
}

func (o offerManagement) UpdateCompany(
	ctx context.Context,
	params UpdateCompanyParams,
) (*UpdateCompanyOutput, error) {
	logger := utils.LoggerWithContext(ctx, o.logger).Named("UpdateCompany")

	sanitizedCompanyName := o.getSanitizedCompanyName(params.CompanyName)

	company := &database.Company{
		ID:             params.CompanyID,
		Name:           sanitizedCompanyName,
		NameLowerCase:  strings.ToLower(sanitizedCompanyName),
		ProfileImageID: params.ProfileImageID,
	}

	if dbErr := o.companyAccessor.UpdateCompany(
		ctx,
		company,
	); dbErr != nil {
		logger.With(zap.Error(dbErr)).Error("failed to update company")
		return &UpdateCompanyOutput{}, status.Error(codes.Internal, dbErr.Error())
	}

	return &UpdateCompanyOutput{
		Company: offer_servicev1.Company{
			Id:              company.ID,
			Name:            company.Name,
			ProfileImageUrl: o.getCompanyProfileImageObjectName(company.ID),
		},
	}, nil
}
