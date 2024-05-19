export const v1CompanyAggregatedOfferStatsSortOrderValue = {
    "VALUE_UNSPECIFIED": "VALUE_UNSPECIFIED",
    "VALUE_LOCATION_ASCENDING": "VALUE_LOCATION_ASCENDING",
    "VALUE_LOCATION_DESCENDING": "VALUE_LOCATION_DESCENDING",
    "VALUE_POSITION_ASCENDING": "VALUE_POSITION_ASCENDING",
    "VALUE_POSITION_DESCENDING": "VALUE_POSITION_DESCENDING"
} as const;
export type V1CompanyAggregatedOfferStatsSortOrderValue = (typeof v1CompanyAggregatedOfferStatsSortOrderValue)[keyof typeof v1CompanyAggregatedOfferStatsSortOrderValue];