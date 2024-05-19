import { V1Offer } from "./V1Offer";

 export type V1GetOfferListResponse = {
    /**
     * @type array | undefined
    */
    offerList?: V1Offer[];
    /**
     * @type string | undefined, uint64
    */
    totalOfferCount?: string;
};