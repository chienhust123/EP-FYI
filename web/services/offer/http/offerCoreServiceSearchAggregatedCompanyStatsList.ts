import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceSearchAggregatedCompanyStatsListMutationRequest, OfferCoreServiceSearchAggregatedCompanyStatsListMutationResponse } from "../models/OfferCoreServiceSearchAggregatedCompanyStatsList";

 /**
 * @description This API endpoint is meant to be used for more in-depth search and filtering of aggregated company statistic.For simpler, faster listing without any filtering logic, use the API endpoint GetAggregatedCompanyStatsList.
 * @summary Search the list of aggregated company statisics.
 * @link /offer_service.v1.OfferCoreService/SearchAggregatedCompanyStatsList
 */
export async function offerCoreServiceSearchAggregatedCompanyStatsList(data?: OfferCoreServiceSearchAggregatedCompanyStatsListMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceSearchAggregatedCompanyStatsListMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceSearchAggregatedCompanyStatsListMutationResponse, OfferCoreServiceSearchAggregatedCompanyStatsListMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/SearchAggregatedCompanyStatsList`, data, ...options });
    return res.data;
}