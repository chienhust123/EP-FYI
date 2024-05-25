package grpc

import (
	"context"
	offer_servicev1 "offer_service/internal/generated/offer_service/v1"
	logic "offer_service/internal/logic"
	"offer_service/internal/pkg/configs"
)

type Handler struct {
	offer_servicev1.UnimplementedOfferCoreServiceServer
	grpcConfig configs.GRPC
	logic      logic.OfferManagement
}

func (h Handler) CreateCompanyProfileImage(
	ctx context.Context,
	_ *offer_servicev1.CreateCompanyProfileImageRequest,
) (*offer_servicev1.CreateCompanyProfileImageResponse, error) {
	output, err := h.logic.CreateCompanyProfileImage(ctx)
	if err != nil {
		return &offer_servicev1.CreateCompanyProfileImageResponse{}, err
	}

	return &offer_servicev1.CreateCompanyProfileImageResponse{
		Image: &output.CompanyProfileImage,
	}, nil
}

func (h Handler) CreateCompany(
	_ context.Context,
	_ *offer_servicev1.CreateCompanyRequest,
) (*offer_servicev1.CreateCompanyResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) UpdateCompany(
	_ context.Context,
	_ *offer_servicev1.UpdateCompanyRequest,
) (*offer_servicev1.UpdateCompanyResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) CreateOfferImage(
	ctx context.Context,
	_ *offer_servicev1.CreateOfferImageRequest,
) (*offer_servicev1.CreateOfferImageResponse, error) {
	output, err := h.logic.CreateOfferImage(ctx)
	if err != nil {
		return &offer_servicev1.CreateOfferImageResponse{}, err
	}

	return &offer_servicev1.CreateOfferImageResponse{
		Image: &output.OfferImage,
	}, nil
}

func (h Handler) CreateOffer(
	_ context.Context,
	_ *offer_servicev1.CreateOfferRequest,
) (*offer_servicev1.CreateOfferResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) UpdateOffer(
	_ context.Context,
	_ *offer_servicev1.UpdateOfferRequest,
) (*offer_servicev1.UpdateOfferResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) GetOffer(
	_ context.Context,
	_ *offer_servicev1.GetOfferRequest,
) (*offer_servicev1.GetOfferResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) GetOfferList(
	_ context.Context,
	_ *offer_servicev1.GetOfferListRequest,
) (*offer_servicev1.GetOfferListResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) GetAggregatedCompanyStatsList(
	_ context.Context,
	_ *offer_servicev1.GetAggregatedCompanyStatsListRequest,
) (*offer_servicev1.GetAggregatedCompanyStatsListResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) SearchAggregatedCompanyStatsList(
	_ context.Context,
	_ *offer_servicev1.SearchAggregatedCompanyStatsListRequest,
) (*offer_servicev1.SearchAggregatedCompanyStatsListResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func (h Handler) GetCompanyAggregatedOfferStatsLists(
	_ context.Context,
	_ *offer_servicev1.GetCompanyAggregatedOfferStatsListsRequest,
) (*offer_servicev1.GetCompanyAggregatedOfferStatsListsResponse, error) {
	panic("TODO: Remove or impl (available through emb type)")
}

func NewHandler(
	grpcConfig configs.GRPC,
	logic logic.OfferManagement,
) (offer_servicev1.OfferCoreServiceServer, error) {
	return &Handler{
		grpcConfig: grpcConfig,
		logic:      logic,
	}, nil
}
