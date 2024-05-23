package logic

import (
	"context"
	"fmt"
	database "offer_service/internal/dataaccess/db"
	offer_servicev1 "offer_service/internal/generated/offer_service/v1"
	"offer_service/internal/handlers/s3"
	"offer_service/internal/pkg/common"
	"offer_service/internal/pkg/configs"
	"offer_service/internal/pkg/utils"
	"time"

	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	CompanyProfileImageObjectName = "company_profile_image"
	OfferImageObjectName          = "offer_image"
)

type CreateCompanyProfileImageOutput struct {
	CompanyProfileImage offer_servicev1.CompanyProfileImage
}

type CreateOfferImageOutput struct {
	OfferImage offer_servicev1.OfferImage
}

type OfferManagement interface {
	CreateCompanyProfileImage(context.Context) (*CreateCompanyProfileImageOutput, error)
	CreateOfferImage(context.Context) (*CreateOfferImageOutput, error)
}

type offerManagement struct {
	config               configs.Config
	s3Client             s3.Client
	companyImageAccessor database.CompanyProfileImageAccessor
	offerImageAccessor   database.OfferImageAccessor
	logger               *zap.Logger
	idGenerator          common.IDGenerator
}

func NewOfferManagement(
	config configs.Config,
	s3Client s3.Client,
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

	companyProfileImage := &database.CompanyProfileImageTab{
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

	offerImage := &database.OfferImageTab{
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
