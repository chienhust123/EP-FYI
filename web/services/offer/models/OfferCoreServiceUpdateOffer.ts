import { RpcStatus } from "./RpcStatus";
import { V1UpdateOfferRequest } from "./V1UpdateOfferRequest";
import type { V1UpdateOfferResponse } from "./V1UpdateOfferResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceUpdateOffer200 = V1UpdateOfferResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceUpdateOfferError = RpcStatus;
export type OfferCoreServiceUpdateOfferMutationRequest = V1UpdateOfferRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceUpdateOfferMutationResponse = V1UpdateOfferResponse;
export type OfferCoreServiceUpdateOfferMutation = {
    Response: OfferCoreServiceUpdateOfferMutationResponse;
    Request: OfferCoreServiceUpdateOfferMutationRequest;
};