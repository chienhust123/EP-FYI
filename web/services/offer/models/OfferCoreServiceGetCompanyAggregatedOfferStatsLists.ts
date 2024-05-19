import { RpcStatus } from "./RpcStatus";
import { V1GetCompanyAggregatedOfferStatsListsRequest } from "./V1GetCompanyAggregatedOfferStatsListsRequest";
import type { V1GetCompanyAggregatedOfferStatsListsResponse } from "./V1GetCompanyAggregatedOfferStatsListsResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceGetCompanyAggregatedOfferStatsLists200 = V1GetCompanyAggregatedOfferStatsListsResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceGetCompanyAggregatedOfferStatsListsError = RpcStatus;
export type OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationRequest = V1GetCompanyAggregatedOfferStatsListsRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse = V1GetCompanyAggregatedOfferStatsListsResponse;
export type OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutation = {
    Response: OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse;
    Request: OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationRequest;
};