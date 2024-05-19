import { RpcStatus } from "./RpcStatus";
import { V1CreateOfferRequest } from "./V1CreateOfferRequest";
import type { V1CreateOfferResponse } from "./V1CreateOfferResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceCreateOffer200 = V1CreateOfferResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceCreateOfferError = RpcStatus;
export type OfferCoreServiceCreateOfferMutationRequest = V1CreateOfferRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceCreateOfferMutationResponse = V1CreateOfferResponse;
export type OfferCoreServiceCreateOfferMutation = {
    Response: OfferCoreServiceCreateOfferMutationResponse;
    Request: OfferCoreServiceCreateOfferMutationRequest;
};