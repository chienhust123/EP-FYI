import { V1AggregatedCompanyStatsFilterOptions } from "./V1AggregatedCompanyStatsFilterOptions";
import { V1AggregatedCompanyStatsSortOrderValue } from "./V1AggregatedCompanyStatsSortOrderValue";

 export type V1SearchAggregatedCompanyStatsListRequest = {
    filterOptions?: V1AggregatedCompanyStatsFilterOptions;
    sortOrder?: V1AggregatedCompanyStatsSortOrderValue;
    /**
     * @type string | undefined, uint64
    */
    offset?: string;
    /**
     * @type string | undefined, uint64
    */
    limit?: string;
};