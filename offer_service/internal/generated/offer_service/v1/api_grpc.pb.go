// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             (unknown)
// source: offer_service/v1/api.proto

package offer_servicev1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	OfferCoreService_CreateCompanyProfileImage_FullMethodName           = "/offer_service.v1.OfferCoreService/CreateCompanyProfileImage"
	OfferCoreService_CreateCompany_FullMethodName                       = "/offer_service.v1.OfferCoreService/CreateCompany"
	OfferCoreService_UpdateCompany_FullMethodName                       = "/offer_service.v1.OfferCoreService/UpdateCompany"
	OfferCoreService_CreateOfferImage_FullMethodName                    = "/offer_service.v1.OfferCoreService/CreateOfferImage"
	OfferCoreService_CreateOffer_FullMethodName                         = "/offer_service.v1.OfferCoreService/CreateOffer"
	OfferCoreService_UpdateOffer_FullMethodName                         = "/offer_service.v1.OfferCoreService/UpdateOffer"
	OfferCoreService_GetOffer_FullMethodName                            = "/offer_service.v1.OfferCoreService/GetOffer"
	OfferCoreService_GetOfferList_FullMethodName                        = "/offer_service.v1.OfferCoreService/GetOfferList"
	OfferCoreService_GetAggregatedCompanyStatsList_FullMethodName       = "/offer_service.v1.OfferCoreService/GetAggregatedCompanyStatsList"
	OfferCoreService_SearchAggregatedCompanyStatsList_FullMethodName    = "/offer_service.v1.OfferCoreService/SearchAggregatedCompanyStatsList"
	OfferCoreService_GetCompanyAggregatedOfferStatsLists_FullMethodName = "/offer_service.v1.OfferCoreService/GetCompanyAggregatedOfferStatsLists"
)

// OfferCoreServiceClient is the client API for OfferCoreService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type OfferCoreServiceClient interface {
	// Create a new company image entry in the database, and returns a S3 presigned URL that can be used by the client to
	// upload an image, which can be associated with a company in the future. This API endpoint is provided to allow admin
	// users a mean to quickly create/update popular company entries for auto suggestion on the front end.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	CreateCompanyProfileImage(ctx context.Context, in *CreateCompanyProfileImageRequest, opts ...grpc.CallOption) (*CreateCompanyProfileImageResponse, error)
	// Create a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly add
	// popular company entries for auto suggestion on the front end - regular users can create new company entries for newly
	// created offer if the associating company does not exist.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	CreateCompany(ctx context.Context, in *CreateCompanyRequest, opts ...grpc.CallOption) (*CreateCompanyResponse, error)
	// Update a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly edit
	// popular company entries for auto suggestion on the front end.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	UpdateCompany(ctx context.Context, in *UpdateCompanyRequest, opts ...grpc.CallOption) (*UpdateCompanyResponse, error)
	// Create a new offer image entry in the database, and returns a S3 presigned URL that can be used by the client to
	// upload an image, which can be associated with an offer in the future.
	CreateOfferImage(ctx context.Context, in *CreateOfferImageRequest, opts ...grpc.CallOption) (*CreateOfferImageResponse, error)
	// Create a new offer entry in the database.
	CreateOffer(ctx context.Context, in *CreateOfferRequest, opts ...grpc.CallOption) (*CreateOfferResponse, error)
	// Update the status of an offer entry in the database.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	UpdateOffer(ctx context.Context, in *UpdateOfferRequest, opts ...grpc.CallOption) (*UpdateOfferResponse, error)
	// Get an offer entry from the database.
	//
	// If the requested offer's status is not `APPROVED`, the requesting client's email address must be in the whitelisted
	// list in the config for the request to be authorized.
	GetOffer(ctx context.Context, in *GetOfferRequest, opts ...grpc.CallOption) (*GetOfferResponse, error)
	// Get the list of offer entrys from the database that match the provided filter options.
	//
	// If the request tries to filter for orders with non-`APPROVED` statuses, the requesting client's email address must be
	// in the whitelisted list in the config for the request to be authorized.
	GetOfferList(ctx context.Context, in *GetOfferListRequest, opts ...grpc.CallOption) (*GetOfferListResponse, error)
	// Get the list of aggregated company statisics.
	//
	// This API endpoint is meant to be used for simple, fast listing. For more in-depth searching and filtering
	// of aggregated company statistics, use the API endpoint GetAggregatedCompanyStatsList.
	GetAggregatedCompanyStatsList(ctx context.Context, in *GetAggregatedCompanyStatsListRequest, opts ...grpc.CallOption) (*GetAggregatedCompanyStatsListResponse, error)
	// Search the list of aggregated company statisics.
	//
	// This API endpoint is meant to be used for more in-depth search and filtering of aggregated company statistic.
	// For simpler, faster listing without any filtering logic, use the API endpoint GetAggregatedCompanyStatsList.
	SearchAggregatedCompanyStatsList(ctx context.Context, in *SearchAggregatedCompanyStatsListRequest, opts ...grpc.CallOption) (*SearchAggregatedCompanyStatsListResponse, error)
	// Get the list of aggregated offer statistic of a company.
	GetCompanyAggregatedOfferStatsLists(ctx context.Context, in *GetCompanyAggregatedOfferStatsListsRequest, opts ...grpc.CallOption) (*GetCompanyAggregatedOfferStatsListsResponse, error)
}

type offerCoreServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewOfferCoreServiceClient(cc grpc.ClientConnInterface) OfferCoreServiceClient {
	return &offerCoreServiceClient{cc}
}

func (c *offerCoreServiceClient) CreateCompanyProfileImage(ctx context.Context, in *CreateCompanyProfileImageRequest, opts ...grpc.CallOption) (*CreateCompanyProfileImageResponse, error) {
	out := new(CreateCompanyProfileImageResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_CreateCompanyProfileImage_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) CreateCompany(ctx context.Context, in *CreateCompanyRequest, opts ...grpc.CallOption) (*CreateCompanyResponse, error) {
	out := new(CreateCompanyResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_CreateCompany_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) UpdateCompany(ctx context.Context, in *UpdateCompanyRequest, opts ...grpc.CallOption) (*UpdateCompanyResponse, error) {
	out := new(UpdateCompanyResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_UpdateCompany_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) CreateOfferImage(ctx context.Context, in *CreateOfferImageRequest, opts ...grpc.CallOption) (*CreateOfferImageResponse, error) {
	out := new(CreateOfferImageResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_CreateOfferImage_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) CreateOffer(ctx context.Context, in *CreateOfferRequest, opts ...grpc.CallOption) (*CreateOfferResponse, error) {
	out := new(CreateOfferResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_CreateOffer_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) UpdateOffer(ctx context.Context, in *UpdateOfferRequest, opts ...grpc.CallOption) (*UpdateOfferResponse, error) {
	out := new(UpdateOfferResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_UpdateOffer_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) GetOffer(ctx context.Context, in *GetOfferRequest, opts ...grpc.CallOption) (*GetOfferResponse, error) {
	out := new(GetOfferResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_GetOffer_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) GetOfferList(ctx context.Context, in *GetOfferListRequest, opts ...grpc.CallOption) (*GetOfferListResponse, error) {
	out := new(GetOfferListResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_GetOfferList_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) GetAggregatedCompanyStatsList(ctx context.Context, in *GetAggregatedCompanyStatsListRequest, opts ...grpc.CallOption) (*GetAggregatedCompanyStatsListResponse, error) {
	out := new(GetAggregatedCompanyStatsListResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_GetAggregatedCompanyStatsList_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) SearchAggregatedCompanyStatsList(ctx context.Context, in *SearchAggregatedCompanyStatsListRequest, opts ...grpc.CallOption) (*SearchAggregatedCompanyStatsListResponse, error) {
	out := new(SearchAggregatedCompanyStatsListResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_SearchAggregatedCompanyStatsList_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *offerCoreServiceClient) GetCompanyAggregatedOfferStatsLists(ctx context.Context, in *GetCompanyAggregatedOfferStatsListsRequest, opts ...grpc.CallOption) (*GetCompanyAggregatedOfferStatsListsResponse, error) {
	out := new(GetCompanyAggregatedOfferStatsListsResponse)
	err := c.cc.Invoke(ctx, OfferCoreService_GetCompanyAggregatedOfferStatsLists_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// OfferCoreServiceServer is the server API for OfferCoreService service.
// All implementations must embed UnimplementedOfferCoreServiceServer
// for forward compatibility
type OfferCoreServiceServer interface {
	// Create a new company image entry in the database, and returns a S3 presigned URL that can be used by the client to
	// upload an image, which can be associated with a company in the future. This API endpoint is provided to allow admin
	// users a mean to quickly create/update popular company entries for auto suggestion on the front end.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	CreateCompanyProfileImage(context.Context, *CreateCompanyProfileImageRequest) (*CreateCompanyProfileImageResponse, error)
	// Create a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly add
	// popular company entries for auto suggestion on the front end - regular users can create new company entries for newly
	// created offer if the associating company does not exist.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	CreateCompany(context.Context, *CreateCompanyRequest) (*CreateCompanyResponse, error)
	// Update a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly edit
	// popular company entries for auto suggestion on the front end.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	UpdateCompany(context.Context, *UpdateCompanyRequest) (*UpdateCompanyResponse, error)
	// Create a new offer image entry in the database, and returns a S3 presigned URL that can be used by the client to
	// upload an image, which can be associated with an offer in the future.
	CreateOfferImage(context.Context, *CreateOfferImageRequest) (*CreateOfferImageResponse, error)
	// Create a new offer entry in the database.
	CreateOffer(context.Context, *CreateOfferRequest) (*CreateOfferResponse, error)
	// Update the status of an offer entry in the database.
	//
	// The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
	UpdateOffer(context.Context, *UpdateOfferRequest) (*UpdateOfferResponse, error)
	// Get an offer entry from the database.
	//
	// If the requested offer's status is not `APPROVED`, the requesting client's email address must be in the whitelisted
	// list in the config for the request to be authorized.
	GetOffer(context.Context, *GetOfferRequest) (*GetOfferResponse, error)
	// Get the list of offer entrys from the database that match the provided filter options.
	//
	// If the request tries to filter for orders with non-`APPROVED` statuses, the requesting client's email address must be
	// in the whitelisted list in the config for the request to be authorized.
	GetOfferList(context.Context, *GetOfferListRequest) (*GetOfferListResponse, error)
	// Get the list of aggregated company statisics.
	//
	// This API endpoint is meant to be used for simple, fast listing. For more in-depth searching and filtering
	// of aggregated company statistics, use the API endpoint GetAggregatedCompanyStatsList.
	GetAggregatedCompanyStatsList(context.Context, *GetAggregatedCompanyStatsListRequest) (*GetAggregatedCompanyStatsListResponse, error)
	// Search the list of aggregated company statisics.
	//
	// This API endpoint is meant to be used for more in-depth search and filtering of aggregated company statistic.
	// For simpler, faster listing without any filtering logic, use the API endpoint GetAggregatedCompanyStatsList.
	SearchAggregatedCompanyStatsList(context.Context, *SearchAggregatedCompanyStatsListRequest) (*SearchAggregatedCompanyStatsListResponse, error)
	// Get the list of aggregated offer statistic of a company.
	GetCompanyAggregatedOfferStatsLists(context.Context, *GetCompanyAggregatedOfferStatsListsRequest) (*GetCompanyAggregatedOfferStatsListsResponse, error)
	mustEmbedUnimplementedOfferCoreServiceServer()
}

// UnimplementedOfferCoreServiceServer must be embedded to have forward compatible implementations.
type UnimplementedOfferCoreServiceServer struct {
}

func (UnimplementedOfferCoreServiceServer) CreateCompanyProfileImage(context.Context, *CreateCompanyProfileImageRequest) (*CreateCompanyProfileImageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateCompanyProfileImage not implemented")
}
func (UnimplementedOfferCoreServiceServer) CreateCompany(context.Context, *CreateCompanyRequest) (*CreateCompanyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateCompany not implemented")
}
func (UnimplementedOfferCoreServiceServer) UpdateCompany(context.Context, *UpdateCompanyRequest) (*UpdateCompanyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateCompany not implemented")
}
func (UnimplementedOfferCoreServiceServer) CreateOfferImage(context.Context, *CreateOfferImageRequest) (*CreateOfferImageResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateOfferImage not implemented")
}
func (UnimplementedOfferCoreServiceServer) CreateOffer(context.Context, *CreateOfferRequest) (*CreateOfferResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateOffer not implemented")
}
func (UnimplementedOfferCoreServiceServer) UpdateOffer(context.Context, *UpdateOfferRequest) (*UpdateOfferResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateOffer not implemented")
}
func (UnimplementedOfferCoreServiceServer) GetOffer(context.Context, *GetOfferRequest) (*GetOfferResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOffer not implemented")
}
func (UnimplementedOfferCoreServiceServer) GetOfferList(context.Context, *GetOfferListRequest) (*GetOfferListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOfferList not implemented")
}
func (UnimplementedOfferCoreServiceServer) GetAggregatedCompanyStatsList(context.Context, *GetAggregatedCompanyStatsListRequest) (*GetAggregatedCompanyStatsListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAggregatedCompanyStatsList not implemented")
}
func (UnimplementedOfferCoreServiceServer) SearchAggregatedCompanyStatsList(context.Context, *SearchAggregatedCompanyStatsListRequest) (*SearchAggregatedCompanyStatsListResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SearchAggregatedCompanyStatsList not implemented")
}
func (UnimplementedOfferCoreServiceServer) GetCompanyAggregatedOfferStatsLists(context.Context, *GetCompanyAggregatedOfferStatsListsRequest) (*GetCompanyAggregatedOfferStatsListsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCompanyAggregatedOfferStatsLists not implemented")
}
func (UnimplementedOfferCoreServiceServer) mustEmbedUnimplementedOfferCoreServiceServer() {}

// UnsafeOfferCoreServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to OfferCoreServiceServer will
// result in compilation errors.
type UnsafeOfferCoreServiceServer interface {
	mustEmbedUnimplementedOfferCoreServiceServer()
}

func RegisterOfferCoreServiceServer(s grpc.ServiceRegistrar, srv OfferCoreServiceServer) {
	s.RegisterService(&OfferCoreService_ServiceDesc, srv)
}

func _OfferCoreService_CreateCompanyProfileImage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateCompanyProfileImageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).CreateCompanyProfileImage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_CreateCompanyProfileImage_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).CreateCompanyProfileImage(ctx, req.(*CreateCompanyProfileImageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_CreateCompany_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateCompanyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).CreateCompany(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_CreateCompany_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).CreateCompany(ctx, req.(*CreateCompanyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_UpdateCompany_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateCompanyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).UpdateCompany(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_UpdateCompany_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).UpdateCompany(ctx, req.(*UpdateCompanyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_CreateOfferImage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateOfferImageRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).CreateOfferImage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_CreateOfferImage_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).CreateOfferImage(ctx, req.(*CreateOfferImageRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_CreateOffer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateOfferRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).CreateOffer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_CreateOffer_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).CreateOffer(ctx, req.(*CreateOfferRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_UpdateOffer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateOfferRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).UpdateOffer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_UpdateOffer_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).UpdateOffer(ctx, req.(*UpdateOfferRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_GetOffer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetOfferRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).GetOffer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_GetOffer_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).GetOffer(ctx, req.(*GetOfferRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_GetOfferList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetOfferListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).GetOfferList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_GetOfferList_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).GetOfferList(ctx, req.(*GetOfferListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_GetAggregatedCompanyStatsList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetAggregatedCompanyStatsListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).GetAggregatedCompanyStatsList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_GetAggregatedCompanyStatsList_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).GetAggregatedCompanyStatsList(ctx, req.(*GetAggregatedCompanyStatsListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_SearchAggregatedCompanyStatsList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SearchAggregatedCompanyStatsListRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).SearchAggregatedCompanyStatsList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_SearchAggregatedCompanyStatsList_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).SearchAggregatedCompanyStatsList(ctx, req.(*SearchAggregatedCompanyStatsListRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OfferCoreService_GetCompanyAggregatedOfferStatsLists_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetCompanyAggregatedOfferStatsListsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OfferCoreServiceServer).GetCompanyAggregatedOfferStatsLists(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: OfferCoreService_GetCompanyAggregatedOfferStatsLists_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OfferCoreServiceServer).GetCompanyAggregatedOfferStatsLists(ctx, req.(*GetCompanyAggregatedOfferStatsListsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// OfferCoreService_ServiceDesc is the grpc.ServiceDesc for OfferCoreService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var OfferCoreService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "offer_service.v1.OfferCoreService",
	HandlerType: (*OfferCoreServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateCompanyProfileImage",
			Handler:    _OfferCoreService_CreateCompanyProfileImage_Handler,
		},
		{
			MethodName: "CreateCompany",
			Handler:    _OfferCoreService_CreateCompany_Handler,
		},
		{
			MethodName: "UpdateCompany",
			Handler:    _OfferCoreService_UpdateCompany_Handler,
		},
		{
			MethodName: "CreateOfferImage",
			Handler:    _OfferCoreService_CreateOfferImage_Handler,
		},
		{
			MethodName: "CreateOffer",
			Handler:    _OfferCoreService_CreateOffer_Handler,
		},
		{
			MethodName: "UpdateOffer",
			Handler:    _OfferCoreService_UpdateOffer_Handler,
		},
		{
			MethodName: "GetOffer",
			Handler:    _OfferCoreService_GetOffer_Handler,
		},
		{
			MethodName: "GetOfferList",
			Handler:    _OfferCoreService_GetOfferList_Handler,
		},
		{
			MethodName: "GetAggregatedCompanyStatsList",
			Handler:    _OfferCoreService_GetAggregatedCompanyStatsList_Handler,
		},
		{
			MethodName: "SearchAggregatedCompanyStatsList",
			Handler:    _OfferCoreService_SearchAggregatedCompanyStatsList_Handler,
		},
		{
			MethodName: "GetCompanyAggregatedOfferStatsLists",
			Handler:    _OfferCoreService_GetCompanyAggregatedOfferStatsLists_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "offer_service/v1/api.proto",
}
