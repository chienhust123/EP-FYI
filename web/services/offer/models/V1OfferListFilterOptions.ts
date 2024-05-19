import { V1PositionLevel } from "./V1PositionLevel";
import { V1OfferStatusValue } from "./V1OfferStatusValue";

 /**
 * @description Filter options when listing offers. Offers must match all of the provided conditions to be returned in the final result.
*/
export type V1OfferListFilterOptions = {
    /**
     * @description The list of company IDs where the offers were extended from. Offers must belong to one of the provided company IDs.
     * @type array | undefined
    */
    companyIdList?: string[];
    /**
     * @description The list of country ISO codes where the offers were extended from. Offers must belong to one of the provided countries.
     * @type array | undefined
    */
    countryList?: string[];
    /**
     * @description The list of state names where the offers were extended from. Offers must belong to one of the provided states.
     * @type array | undefined
    */
    stateList?: string[];
    /**
     * @description The list of city names where the offers were extended from. Offers must belong to one of the provided cities.
     * @type array | undefined
    */
    cityList?: string[];
    /**
     * @description The list of position titles of the requested offers. Offers must match one of the provided title using full-text index search.
     * @type array | undefined
    */
    positionTitleList?: string[];
    /**
     * @description The list of position level codes of the requested offers. Offers must match one of the provided level codes.
     * @type array | undefined
    */
    positionLevelList?: V1PositionLevel[];
    /**
     * @description The list of statuses the offer must be in. Any users can filter for offers with APPROVED status, but only whitelisted users can filter for offer of other statuses.
     * @type array | undefined
    */
    statusList?: V1OfferStatusValue[];
};