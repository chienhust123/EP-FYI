import { RpcStatus } from "./RpcStatus";
import { V1CreateCompanyProfileImageRequest } from "./V1CreateCompanyProfileImageRequest";
import type { V1CreateCompanyProfileImageResponse } from "./V1CreateCompanyProfileImageResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceCreateCompanyProfileImage200 = V1CreateCompanyProfileImageResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceCreateCompanyProfileImageError = RpcStatus;
export type OfferCoreServiceCreateCompanyProfileImageMutationRequest = V1CreateCompanyProfileImageRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceCreateCompanyProfileImageMutationResponse = V1CreateCompanyProfileImageResponse;
export type OfferCoreServiceCreateCompanyProfileImageMutation = {
    Response: OfferCoreServiceCreateCompanyProfileImageMutationResponse;
    Request: OfferCoreServiceCreateCompanyProfileImageMutationRequest;
};