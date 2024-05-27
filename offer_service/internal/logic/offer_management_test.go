package logic_test

import (
	"context"
	"fmt"
	database "offer_service/internal/dataaccess/db"
	s3 "offer_service/internal/handlers/s3"
	logic "offer_service/internal/logic"
	common "offer_service/internal/pkg/common"
	"offer_service/internal/pkg/configs"
	"strings"
	"testing"
	"time"

	"github.com/jaswdr/faker/v2"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"
	"go.uber.org/zap"
)

type OfferManagementTestSuite struct {
	ctrl                            *gomock.Controller
	mockCompanyAccessor             *database.MockCompanyAccessor
	mockCompanyProfileImageAccessor *database.MockCompanyProfileImageAccessor
	mockOfferImageAccessor          *database.MockOfferImageAccessor
	mockS3Client                    *s3.MockClient
	logger                          *zap.Logger
	config                          configs.Config
	offerManagement                 logic.OfferManagement
	mockIDGenerator                 *common.MockIDGenerator
}

func setup(t *testing.T) *OfferManagementTestSuite {
	ctrl := gomock.NewController(t)

	mockCompanyAccessor := database.NewMockCompanyAccessor(ctrl)
	mockCompanyProfileImageAccessor := database.NewMockCompanyProfileImageAccessor(ctrl)
	mockOfferImageAccessor := database.NewMockOfferImageAccessor(ctrl)
	mockS3Client := s3.NewMockClient(ctrl)

	logger, _ := zap.NewProduction()

	config := configs.Config{
		GRPC: configs.GRPC{
			CreateCompanyProfileImage: configs.CreateCompanyProfileImage{
				BucketName:           "upload-company-image-profile-image",
				PresignURLExpiryTime: "30s",
				Location:             "us-east-1",
			},
			CreateOfferImage: configs.CreateOfferImage{
				BucketName:           "upload-offer-image",
				PresignURLExpiryTime: "30s",
				Location:             "us-east-1",
			},
		},
	}

	mockIDGenerator := common.NewMockIDGenerator(ctrl)
	mockS3Client.EXPECT().
		CreateBucketIfNotExists(
			gomock.Any(),
			config.GRPC.CreateCompanyProfileImage.BucketName,
			config.GRPC.CreateCompanyProfileImage.Location,
		).
		Return(nil)

	mockS3Client.EXPECT().
		CreateBucketIfNotExists(
			gomock.Any(),
			config.GRPC.CreateOfferImage.BucketName,
			config.GRPC.CreateOfferImage.Location,
		).
		Return(nil)

	offerManagement, err := logic.NewOfferManagement(
		config,
		mockS3Client,
		mockCompanyAccessor,
		mockCompanyProfileImageAccessor,
		mockOfferImageAccessor,
		logger,
		mockIDGenerator,
	)
	require.NoError(t, err)

	return &OfferManagementTestSuite{
		ctrl:                            ctrl,
		mockCompanyAccessor:             mockCompanyAccessor,
		mockCompanyProfileImageAccessor: mockCompanyProfileImageAccessor,
		mockOfferImageAccessor:          mockOfferImageAccessor,
		mockS3Client:                    mockS3Client,
		logger:                          logger,
		config:                          config,
		offerManagement:                 offerManagement,
		mockIDGenerator:                 mockIDGenerator,
	}
}

func teardown(suite *OfferManagementTestSuite) {
	suite.ctrl.Finish()
	_ = suite.logger.Sync()
}

func TestOfferManagement_CreateCompanyProfileImage(t *testing.T) {
	suite := setup(t)
	defer teardown(suite)
	fake := faker.New()

	expireTime, _ := time.ParseDuration(
		suite.config.GRPC.CreateCompanyProfileImage.PresignURLExpiryTime,
	)
	presignPutURL := fake.Internet().URL()
	mockID := fake.UInt64()

	companyProfileImage := &database.CompanyProfileImage{
		ID: mockID,
	}

	ctx := context.Background()

	suite.mockIDGenerator.EXPECT().
		GenerateID().
		Return(mockID)

	suite.mockS3Client.EXPECT().
		GeneratePresignedUploadURL(
			ctx,
			suite.config.GRPC.CreateCompanyProfileImage.BucketName,
			fmt.Sprintf("%s_%d", logic.CompanyProfileImageObjectName, companyProfileImage.ID),
			expireTime,
		).
		Return(presignPutURL, nil)

	suite.mockCompanyProfileImageAccessor.EXPECT().
		CreateCompanyProfileImage(ctx, gomock.Any()).
		Return(nil)

	result, err := suite.offerManagement.CreateCompanyProfileImage(ctx)
	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, companyProfileImage.ID, result.CompanyProfileImage.GetId())
	require.Equal(t, presignPutURL, result.CompanyProfileImage.GetPresignPutUrl())
}

func TestOfferManagement_CreateOfferImage(t *testing.T) {
	suite := setup(t)
	defer teardown(suite)
	fake := faker.New()

	expireTime, _ := time.ParseDuration(
		suite.config.GRPC.CreateOfferImage.PresignURLExpiryTime,
	)
	presignPutURL := fake.Internet().URL()
	mockID := fake.UInt64()

	offerImage := &database.OfferImage{
		ID: mockID,
	}

	ctx := context.Background()

	suite.mockIDGenerator.EXPECT().
		GenerateID().
		Return(mockID)

	suite.mockS3Client.EXPECT().
		GeneratePresignedUploadURL(
			ctx,
			suite.config.GRPC.CreateOfferImage.BucketName,
			fmt.Sprintf("%s_%d", logic.OfferImageObjectName, offerImage.ID),
			expireTime,
		).
		Return(presignPutURL, nil)

	suite.mockOfferImageAccessor.EXPECT().
		CreateOfferImage(ctx, gomock.Any()).
		Return(nil)

	result, err := suite.offerManagement.CreateOfferImage(ctx)
	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, offerImage.ID, result.OfferImage.GetId())
	require.Equal(t, presignPutURL, result.OfferImage.GetPresignPutUrl())
}

func TestOfferManagement_CreateCompany(t *testing.T) {
	suite := setup(t)
	defer teardown(suite)
	fake := faker.New()

	ctx := context.Background()

	expectedID := fake.UInt64()

	params := logic.CreateCompanyParams{
		CompanyName:    fake.Company().Name(),
		ProfileImageID: fake.UInt64(),
	}

	company := &database.Company{
		ID:             expectedID,
		Name:           params.CompanyName,
		NameLowerCase:  strings.ToLower(params.CompanyName),
		ProfileImageID: params.ProfileImageID,
	}

	suite.mockIDGenerator.EXPECT().GenerateID().Return(expectedID)
	suite.mockCompanyAccessor.EXPECT().CreateCompany(ctx, company).Return(nil)

	result, err := suite.offerManagement.CreateCompany(ctx, params)
	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, expectedID, result.Company.GetId())
	require.Equal(t, params.CompanyName, result.Company.GetName())
}

func TestOfferManagement_UpdateCompany(t *testing.T) {
	suite := setup(t)
	defer teardown(suite)
	fake := faker.New()

	ctx := context.Background()

	expectedID := fake.UInt64()

	params := logic.UpdateCompanyParams{
		CompanyID:      expectedID,
		CompanyName:    fake.Company().Name(),
		ProfileImageID: fake.UInt64(),
	}

	company := &database.Company{
		ID:             expectedID,
		Name:           params.CompanyName,
		NameLowerCase:  strings.ToLower(params.CompanyName),
		ProfileImageID: params.ProfileImageID,
	}

	suite.mockCompanyAccessor.EXPECT().
		UpdateCompany(ctx, company).
		Return(nil)

	result, err := suite.offerManagement.UpdateCompany(ctx, params)
	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, expectedID, result.Company.GetId())
	require.Equal(t, params.CompanyName, result.Company.GetName())
}
