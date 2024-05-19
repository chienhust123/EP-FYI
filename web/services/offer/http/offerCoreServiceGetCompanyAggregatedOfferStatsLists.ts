import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationRequest, OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse } from "../models/OfferCoreServiceGetCompanyAggregatedOfferStatsLists";

 /**
 * @summary Get the list of aggregated offer statistic of a company.
 * @link /offer_service.v1.OfferCoreService/GetCompanyAggregatedOfferStatsLists
 */
export async function offerCoreServiceGetCompanyAggregatedOfferStatsLists(data?: OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse, OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/GetCompanyAggregatedOfferStatsLists`, data, ...options });
    return res.data;
}