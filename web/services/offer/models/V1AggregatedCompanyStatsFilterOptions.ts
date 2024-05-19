/**
 * @description Filter options when listing aggregated company statistics. Entries must match all of the provided conditions to be returned in the final result.
*/
export type V1AggregatedCompanyStatsFilterOptions = {
    /**
     * @description The company name to search for. The company\'s name must match the provided query using full-text index search.
     * @type string | undefined
    */
    companyNameQuery?: string;
    /**
     * @description The list of country ISO codes where the offers were extended from.\nThe company must have at least one aggregated offer information belonging to one of the provided countries.
     * @type array | undefined
    */
    countryList?: string[];
    /**
     * @description The list of state names where the offers were extended from.\nThe company must have at least one aggregated offer information belonging to one of the provided states.
     * @type array | undefined
    */
    stateList?: string[];
    /**
     * @description The list of city names where the offers were extended from.\nThe company must have at least one aggregated offer information belonging to one of the provided cities.
     * @type array | undefined
    */
    cityList?: string[];
    /**
     * @description The list of position titles of the requested offers.\nThe company must have at least one aggregated offer information matching one of the provided title using full-text index search.
     * @type array | undefined
    */
    positionTitleList?: string[];
    /**
     * @description The list of position level codes of the requested offers.\nThe company must have at least one aggregated offer information matching one of the provided level codes.
     * @type array | undefined
    */
    positionLevelList?: string[];
};