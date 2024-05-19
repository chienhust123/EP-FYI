export const v1AggregatedCompanyStatsSortOrderValue = {
    "VALUE_UNSPECIFIED": "VALUE_UNSPECIFIED",
    "VALUE_ID_ASCENDING": "VALUE_ID_ASCENDING",
    "VALUE_ID_DESCENDING": "VALUE_ID_DESCENDING",
    "VALUE_NAME_ASCENDING": "VALUE_NAME_ASCENDING",
    "VALUE_NAME_DESCENDING": "VALUE_NAME_DESCENDING"
} as const;
export type V1AggregatedCompanyStatsSortOrderValue = (typeof v1AggregatedCompanyStatsSortOrderValue)[keyof typeof v1AggregatedCompanyStatsSortOrderValue];