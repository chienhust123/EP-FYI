import { V1Company } from "./V1Company";

 export type V1AggregatedCompanyStats = {
    company?: V1Company;
    /**
     * @type string | undefined, uint64
    */
    totalSubmissionCount?: string;
};