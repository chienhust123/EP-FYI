import { RpcStatus } from "./RpcStatus";
import { V1GetOfferListRequest } from "./V1GetOfferListRequest";
import type { V1GetOfferListResponse } from "./V1GetOfferListResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceGetOfferList200 = V1GetOfferListResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceGetOfferListError = RpcStatus;
export type OfferCoreServiceGetOfferListMutationRequest = V1GetOfferListRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceGetOfferListMutationResponse = V1GetOfferListResponse;
export type OfferCoreServiceGetOfferListMutation = {
    Response: OfferCoreServiceGetOfferListMutationResponse;
    Request: OfferCoreServiceGetOfferListMutationRequest;
};