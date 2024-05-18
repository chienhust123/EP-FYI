package logic_test

import (
	"context"
	"fmt"
	database "offer_service/internal/dataaccess/db"
	logic "offer_service/internal/logic"
	"offer_service/internal/pkg/configs"
	mockdatabase "offer_service/test/mocks/dataaccess/db"
	mocks3client "offer_service/test/mocks/handlers/s3"
	mockcommon "offer_service/test/mocks/pkg/common"
	"testing"
	"time"

	"github.com/jaswdr/faker/v2"
	"github.com/stretchr/testify/require"
	"go.uber.org/mock/gomock"
	"go.uber.org/zap"
)

type OfferManagementTestSuite struct {
	ctrl            *gomock.Controller
	mockOCAccessor  *mockdatabase.MockOfferCoreAccessor
	mockS3Client    *mocks3client.MockClient
	logger          *zap.Logger
	config          configs.Config
	offerManagement logic.OfferManagement
	mockIDGenerator *mockcommon.MockIDGenerator
}

func setup(t *testing.T) *OfferManagementTestSuite {
	ctrl := gomock.NewController(t)

	mockOCAccessor := mockdatabase.NewMockOfferCoreAccessor(ctrl)
	mockS3Client := mocks3client.NewMockClient(ctrl)

	logger, _ := zap.NewProduction()

	config := configs.Config{
		GRPC: configs.GRPC{
			CreateCompanyProfileImage: configs.CreateCompanyProfileImage{
				BucketName:           "upload-company-image-profile-image",
				PresignURLExpiryTime: "30s",
			},
		},
	}

	mockIDGenerator := mockcommon.NewMockIDGenerator(ctrl)

	offerManagement := logic.NewOfferManagement(
		config,
		mockS3Client,
		mockOCAccessor,
		logger,
		mockIDGenerator,
	)

	return &OfferManagementTestSuite{
		ctrl:            ctrl,
		mockOCAccessor:  mockOCAccessor,
		mockS3Client:    mockS3Client,
		logger:          logger,
		config:          config,
		offerManagement: offerManagement,
		mockIDGenerator: mockIDGenerator,
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

	companyProfileImage := &database.CompanyProfileImageTab{
		ID: mockID,
	}

	ctx := context.Background()

	suite.mockIDGenerator.EXPECT().
		GenerateID().
		Return(mockID)

	suite.mockS3Client.EXPECT().
		GeneratePresignedUploadURL(
			context.Background(),
			suite.config.GRPC.CreateCompanyProfileImage.BucketName,
			fmt.Sprintf("%s_%d", logic.CompanyProfileImageObjectName, companyProfileImage.ID),
			expireTime,
		).
		Return(presignPutURL, nil)

	suite.mockOCAccessor.EXPECT().
		CreateCompanyProfileImage(ctx, gomock.Any()).
		Return(nil)

	result, err := suite.offerManagement.CreateCompanyProfileImage(ctx)
	require.NoError(t, err)
	require.NotNil(t, result)
	require.Equal(t, companyProfileImage.ID, result.CompanyProfileImage.GetId())
	require.Equal(t, presignPutURL, result.CompanyProfileImage.GetPresignPutUrl())
}
