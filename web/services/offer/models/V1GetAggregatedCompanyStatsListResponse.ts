import { V1AggregatedCompanyStats } from "./V1AggregatedCompanyStats";

 export type V1GetAggregatedCompanyStatsListResponse = {
    /**
     * @type array | undefined
    */
    companyStatList?: V1AggregatedCompanyStats[];
    /**
     * @type string | undefined, uint64
    */
    previousCompanyId?: string;
    /**
     * @type string | undefined
    */
    previousCompanyName?: string;
    /**
     * @type string | undefined, uint64
    */
    nextCompanyId?: string;
    /**
     * @type string | undefined
    */
    nextCompanyName?: string;
};