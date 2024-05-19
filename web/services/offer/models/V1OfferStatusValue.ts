export const v1OfferStatusValue = {
    "VALUE_UNSPECIFIED": "VALUE_UNSPECIFIED",
    "VALUE_UPLOADED": "VALUE_UPLOADED",
    "VALUE_APPROVED": "VALUE_APPROVED",
    "VALUE_DISAPPROVED": "VALUE_DISAPPROVED"
} as const;
export type V1OfferStatusValue = (typeof v1OfferStatusValue)[keyof typeof v1OfferStatusValue];