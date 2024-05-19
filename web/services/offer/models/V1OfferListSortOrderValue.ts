export const v1OfferListSortOrderValue = {
    "VALUE_UNSPECIFIED": "VALUE_UNSPECIFIED",
    "VALUE_CREATED_TIME_ASCENDING": "VALUE_CREATED_TIME_ASCENDING",
    "VALUE_CREATED_TIME_DESCENDING": "VALUE_CREATED_TIME_DESCENDING",
    "VALUE_COMPANY_ASCENDING": "VALUE_COMPANY_ASCENDING",
    "VALUE_COMPANY_DESCENDING": "VALUE_COMPANY_DESCENDING",
    "VALUE_LOCATION_ASCENDING": "VALUE_LOCATION_ASCENDING",
    "VALUE_LOCATION_DESCENDING": "VALUE_LOCATION_DESCENDING",
    "VALUE_POSITION_ASCENDING": "VALUE_POSITION_ASCENDING",
    "VALUE_POSITION_DESCENDING": "VALUE_POSITION_DESCENDING",
    "VALUE_POSITION_LEVEL_ASCENDING": "VALUE_POSITION_LEVEL_ASCENDING",
    "VALUE_POSITION_LEVEL_DESCENDING": "VALUE_POSITION_LEVEL_DESCENDING",
    "VALUE_TOTAL_PACKAGE_ASCENDING": "VALUE_TOTAL_PACKAGE_ASCENDING",
    "VALUE_TOTAL_PACKAGE_DESCENDING": "VALUE_TOTAL_PACKAGE_DESCENDING"
} as const;
export type V1OfferListSortOrderValue = (typeof v1OfferListSortOrderValue)[keyof typeof v1OfferListSortOrderValue];