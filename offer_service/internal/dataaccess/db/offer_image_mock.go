// Code generated by MockGen. DO NOT EDIT.
// Source: ./offer_image.go
//
// Generated by this command:
//
//	mockgen -source=./offer_image.go -destination=./offer_image_mock.go -package=database
//

// Package database is a generated GoMock package.
package database

import (
	context "context"
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockOfferImageAccessor is a mock of OfferImageAccessor interface.
type MockOfferImageAccessor struct {
	ctrl     *gomock.Controller
	recorder *MockOfferImageAccessorMockRecorder
}

// MockOfferImageAccessorMockRecorder is the mock recorder for MockOfferImageAccessor.
type MockOfferImageAccessorMockRecorder struct {
	mock *MockOfferImageAccessor
}

// NewMockOfferImageAccessor creates a new mock instance.
func NewMockOfferImageAccessor(ctrl *gomock.Controller) *MockOfferImageAccessor {
	mock := &MockOfferImageAccessor{ctrl: ctrl}
	mock.recorder = &MockOfferImageAccessorMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockOfferImageAccessor) EXPECT() *MockOfferImageAccessorMockRecorder {
	return m.recorder
}

// CreateOfferImage mocks base method.
func (m *MockOfferImageAccessor) CreateOfferImage(ctx context.Context, data *OfferImage) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateOfferImage", ctx, data)
	ret0, _ := ret[0].(error)
	return ret0
}

// CreateOfferImage indicates an expected call of CreateOfferImage.
func (mr *MockOfferImageAccessorMockRecorder) CreateOfferImage(ctx, data any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateOfferImage", reflect.TypeOf((*MockOfferImageAccessor)(nil).CreateOfferImage), ctx, data)
}
