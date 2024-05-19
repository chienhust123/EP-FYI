import { V1AggregatedCompanyStats } from "./V1AggregatedCompanyStats";

 export type V1GetCompanyAggregatedOfferStatsListsResponse = {
    /**
     * @type array | undefined
    */
    offerStatList?: V1AggregatedCompanyStats[];
    /**
     * @type string | undefined, uint64
    */
    previousLocationId?: string;
    /**
     * @type string | undefined
    */
    previousPositionId?: string;
    /**
     * @type string | undefined, uint64
    */
    nextLocationId?: string;
    /**
     * @type string | undefined
    */
    nextPositionId?: string;
};