import { RpcStatus } from "./RpcStatus";
import { V1CreateOfferImageRequest } from "./V1CreateOfferImageRequest";
import type { V1CreateOfferImageResponse } from "./V1CreateOfferImageResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceCreateOfferImage200 = V1CreateOfferImageResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceCreateOfferImageError = RpcStatus;
export type OfferCoreServiceCreateOfferImageMutationRequest = V1CreateOfferImageRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceCreateOfferImageMutationResponse = V1CreateOfferImageResponse;
export type OfferCoreServiceCreateOfferImageMutation = {
    Response: OfferCoreServiceCreateOfferImageMutationResponse;
    Request: OfferCoreServiceCreateOfferImageMutationRequest;
};