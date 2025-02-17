// Code generated by MockGen. DO NOT EDIT.
// Source: ./offer_core.go
//
// Generated by this command:
//
//	mockgen -source=./offer_core.go -destination=./offer_mock.go -package=database
//

// Package database is a generated GoMock package.
package database

import (
	context "context"
	reflect "reflect"

	gomock "go.uber.org/mock/gomock"
)

// MockOfferAccessor is a mock of OfferAccessor interface.
type MockOfferAccessor struct {
	ctrl     *gomock.Controller
	recorder *MockOfferAccessorMockRecorder
}

// MockOfferAccessorMockRecorder is the mock recorder for MockOfferAccessor.
type MockOfferAccessorMockRecorder struct {
	mock *MockOfferAccessor
}

// NewMockOfferAccessor creates a new mock instance.
func NewMockOfferAccessor(ctrl *gomock.Controller) *MockOfferAccessor {
	mock := &MockOfferAccessor{ctrl: ctrl}
	mock.recorder = &MockOfferAccessorMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockOfferAccessor) EXPECT() *MockOfferAccessorMockRecorder {
	return m.recorder
}

// Create mocks base method.
func (m *MockOfferAccessor) Create(ctx context.Context, offer *Offer) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Create", ctx, offer)
	ret0, _ := ret[0].(error)
	return ret0
}

// Create indicates an expected call of Create.
func (mr *MockOfferAccessorMockRecorder) Create(ctx, offer any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockOfferAccessor)(nil).Create), ctx, offer)
}
