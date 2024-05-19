import { RpcStatus } from "./RpcStatus";
import { V1GetAggregatedCompanyStatsListRequest } from "./V1GetAggregatedCompanyStatsListRequest";
import type { V1GetAggregatedCompanyStatsListResponse } from "./V1GetAggregatedCompanyStatsListResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceGetAggregatedCompanyStatsList200 = V1GetAggregatedCompanyStatsListResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceGetAggregatedCompanyStatsListError = RpcStatus;
export type OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest = V1GetAggregatedCompanyStatsListRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse = V1GetAggregatedCompanyStatsListResponse;
export type OfferCoreServiceGetAggregatedCompanyStatsListMutation = {
    Response: OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse;
    Request: OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest;
};