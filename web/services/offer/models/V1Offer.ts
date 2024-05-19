import { V1Company } from "./V1Company";
import { OfferServicev1Location } from "./OfferServicev1Location";
import { V1Position } from "./V1Position";
import { V1MonetaryValue } from "./V1MonetaryValue";
import { V1OfferStatusValue } from "./V1OfferStatusValue";

 export type V1Offer = {
    /**
     * @type string | undefined, uint64
    */
    id?: string;
    company?: V1Company;
    location?: OfferServicev1Location;
    position?: V1Position;
    totalPackage?: V1MonetaryValue;
    /**
     * @type string | undefined
    */
    imageUrl?: string;
    status?: V1OfferStatusValue;
    /**
     * @type string | undefined, uint64
    */
    createdTime?: string;
};