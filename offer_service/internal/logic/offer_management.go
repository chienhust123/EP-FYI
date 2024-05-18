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
)

type CreateCompanyProfileImageOutput struct {
	CompanyProfileImage offer_servicev1.CompanyProfileImage
}

type OfferManagement interface {
	CreateCompanyProfileImage(context.Context) (*CreateCompanyProfileImageOutput, error)
}

type offerManagement struct {
	config      configs.Config
	s3Client    s3.Client
	ocAccessor  database.OfferCoreAccessor
	logger      *zap.Logger
	idGenerator common.IDGenerator
}

func NewOfferManagement(
	config configs.Config,
	s3Client s3.Client,
	ocAccessor database.OfferCoreAccessor,
	logger *zap.Logger,
	idGenerator common.IDGenerator,
) OfferManagement {
	return &offerManagement{
		config:      config,
		s3Client:    s3Client,
		ocAccessor:  ocAccessor,
		logger:      logger,
		idGenerator: idGenerator,
	}
}

func (o *offerManagement) CreateCompanyProfileImage(
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

	companyProfileImage := &database.CompanyProfileImageTab{
		ID:         o.idGenerator.GenerateID(),
		ObjectName: CompanyProfileImageObjectName,
		ExpireTime: expireTime,
	}

	presignPutURL, presignErr := o.s3Client.GeneratePresignedUploadURL(
		ctx,
		o.config.GRPC.CreateCompanyProfileImage.BucketName,
		fmt.Sprintf("%s_%d", CompanyProfileImageObjectName, companyProfileImage.ID),
		expireTime,
	)

	if presignErr != nil {
		logger.With(zap.Error(presignErr)).Error("failed to presign create company image url")
		return &CreateCompanyProfileImageOutput{}, status.Error(codes.Internal, presignErr.Error())
	}

	if dbErr := o.ocAccessor.CreateCompanyProfileImage(ctx, companyProfileImage); dbErr != nil {
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
