import { V1AggregatedCompanyStats } from "./V1AggregatedCompanyStats";

 export type V1SearchAggregatedCompanyStatsListResponse = {
    /**
     * @type array | undefined
    */
    companyStatList?: V1AggregatedCompanyStats[];
    /**
     * @type string | undefined, uint64
    */
    totalCompanyStatCount?: string;
};