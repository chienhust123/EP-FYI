import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest, OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse } from "../models/OfferCoreServiceGetAggregatedCompanyStatsList";

 /**
 * @description This API endpoint is meant to be used for simple, fast listing. For more in-depth searching and filteringof aggregated company statistics, use the API endpoint GetAggregatedCompanyStatsList.
 * @summary Get the list of aggregated company statisics.
 * @link /offer_service.v1.OfferCoreService/GetAggregatedCompanyStatsList
 */
export async function offerCoreServiceGetAggregatedCompanyStatsList(data?: OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse, OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/GetAggregatedCompanyStatsList`, data, ...options });
    return res.data;
}