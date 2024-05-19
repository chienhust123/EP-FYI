import { V1OfferListFilterOptions } from "./V1OfferListFilterOptions";
import { V1OfferListSortOrderValue } from "./V1OfferListSortOrderValue";

 export type V1GetOfferListRequest = {
    filterOptions?: V1OfferListFilterOptions;
    sortOrder?: V1OfferListSortOrderValue;
    /**
     * @type string | undefined, uint64
    */
    offset?: string;
    /**
     * @type string | undefined, uint64
    */
    limit?: string;
};