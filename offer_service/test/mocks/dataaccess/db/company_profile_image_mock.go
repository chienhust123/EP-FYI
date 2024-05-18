// Code generated by MockGen. DO NOT EDIT.
// Source: ./company_profile_image.go
//
// Generated by this command:
//
//	mockgen -source=./company_profile_image.go -destination=../../../test/mocks/dataaccess/db/company_profile_image_mock.go -package=mockdatabase
//

// Package mockdatabase is a generated GoMock package.
package mockdatabase

import (
	context "context"
	database "offer_service/internal/dataaccess/db"
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockOfferCoreAccessor is a mock of OfferCoreAccessor interface.
type MockOfferCoreAccessor struct {
	ctrl     *gomock.Controller
	recorder *MockOfferCoreAccessorMockRecorder
}

// MockOfferCoreAccessorMockRecorder is the mock recorder for MockOfferCoreAccessor.
type MockOfferCoreAccessorMockRecorder struct {
	mock *MockOfferCoreAccessor
}

// NewMockOfferCoreAccessor creates a new mock instance.
func NewMockOfferCoreAccessor(ctrl *gomock.Controller) *MockOfferCoreAccessor {
	mock := &MockOfferCoreAccessor{ctrl: ctrl}
	mock.recorder = &MockOfferCoreAccessorMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockOfferCoreAccessor) EXPECT() *MockOfferCoreAccessorMockRecorder {
	return m.recorder
}

// CreateCompanyProfileImage mocks base method.
func (m *MockOfferCoreAccessor) CreateCompanyProfileImage(ctx context.Context, data *database.CompanyProfileImageTab) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateCompanyProfileImage", ctx, data)
	ret0, _ := ret[0].(error)
	return ret0
}

// CreateCompanyProfileImage indicates an expected call of CreateCompanyProfileImage.
func (mr *MockOfferCoreAccessorMockRecorder) CreateCompanyProfileImage(ctx, data any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateCompanyProfileImage", reflect.TypeOf((*MockOfferCoreAccessor)(nil).CreateCompanyProfileImage), ctx, data)
}
