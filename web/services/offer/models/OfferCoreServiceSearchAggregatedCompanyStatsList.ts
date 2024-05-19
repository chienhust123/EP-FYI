import { RpcStatus } from "./RpcStatus";
import { V1SearchAggregatedCompanyStatsListRequest } from "./V1SearchAggregatedCompanyStatsListRequest";
import type { V1SearchAggregatedCompanyStatsListResponse } from "./V1SearchAggregatedCompanyStatsListResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceSearchAggregatedCompanyStatsList200 = V1SearchAggregatedCompanyStatsListResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceSearchAggregatedCompanyStatsListError = RpcStatus;
export type OfferCoreServiceSearchAggregatedCompanyStatsListMutationRequest = V1SearchAggregatedCompanyStatsListRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceSearchAggregatedCompanyStatsListMutationResponse = V1SearchAggregatedCompanyStatsListResponse;
export type OfferCoreServiceSearchAggregatedCompanyStatsListMutation = {
    Response: OfferCoreServiceSearchAggregatedCompanyStatsListMutationResponse;
    Request: OfferCoreServiceSearchAggregatedCompanyStatsListMutationRequest;
};