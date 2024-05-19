import { V1AggregatedCompanyStatsSortOrderValue } from "./V1AggregatedCompanyStatsSortOrderValue";

 export type V1GetAggregatedCompanyStatsListRequest = {
    /**
     * @type string | undefined, uint64
    */
    companyId?: string;
    /**
     * @type string | undefined
    */
    companyName?: string;
    sortOrder?: V1AggregatedCompanyStatsSortOrderValue;
    /**
     * @type string | undefined, uint64
    */
    limit?: string;
};