import { QueryClient, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { offerCoreServiceGetAggregatedCompanyStatsList, OfferCoreServiceGetAggregatedCompanyStatsListMutationRequest, OfferCoreServiceGetAggregatedCompanyStatsListMutationResponse, OfferCoreServiceGetCompanyAggregatedOfferStatsListsMutationResponse, v1CompanyAggregatedOfferStatsSortOrderValue, V1GetAggregatedCompanyStatsListRequest, V1GetAggregatedCompanyStatsListResponse } from "../offer";

export const queryClient = new QueryClient({
  defaultOptions: {},
})
