import { OfferStatus, PositionLevel } from "@/services/offer";

export const OfferStatusMap: Record<OfferStatus, string> = {
  [OfferStatus.VALUE_UNSPECIFIED]: "Unspecified",
  [OfferStatus.VALUE_UPLOADED]: "Uploaded",
  [OfferStatus.VALUE_APPROVED]: "Approved",
  [OfferStatus.VALUE_DISAPPROVED]: "Disapproved"
};

export const PositionLevelMap: Record<PositionLevel, string> = {
  [PositionLevel.VALUE_UNSPECIFIED]: "Unspecified",
  [PositionLevel.VALUE_INTERN]: "Intern",
  [PositionLevel.VALUE_ENTRY]: "Entry-level",
  [PositionLevel.VALUE_MIDDLE]: "Mid-level",
  [PositionLevel.VALUE_SENIOR]: "Senior",
  [PositionLevel.VALUE_PRINCIPAL]: "Principal"
};