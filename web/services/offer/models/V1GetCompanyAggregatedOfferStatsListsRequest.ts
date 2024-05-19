import { V1CompanyAggregatedOfferStatsSortOrderValue } from "./V1CompanyAggregatedOfferStatsSortOrderValue";

 export type V1GetCompanyAggregatedOfferStatsListsRequest = {
    /**
     * @type string | undefined, uint64
    */
    locationId?: string;
    /**
     * @type string | undefined
    */
    positionName?: string;
    sortOrder?: V1CompanyAggregatedOfferStatsSortOrderValue;
    /**
     * @type string | undefined, uint64
    */
    limit?: string;
    /**
     * @description The 3-letter ISO currency code of the currency denoting the currency to return the aggregated offer stats in.
     * @type string | undefined
    */
    baseCurrency?: string;
};