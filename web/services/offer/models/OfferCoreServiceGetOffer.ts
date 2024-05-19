import { RpcStatus } from "./RpcStatus";
import { V1GetOfferRequest } from "./V1GetOfferRequest";
import type { V1GetOfferResponse } from "./V1GetOfferResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceGetOffer200 = V1GetOfferResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceGetOfferError = RpcStatus;
export type OfferCoreServiceGetOfferMutationRequest = V1GetOfferRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceGetOfferMutationResponse = V1GetOfferResponse;
export type OfferCoreServiceGetOfferMutation = {
    Response: OfferCoreServiceGetOfferMutationResponse;
    Request: OfferCoreServiceGetOfferMutationRequest;
};