import { V1Offer } from "./V1Offer";

 export type V1UpdateOfferRequest = {
    /**
     * @type string | undefined, uint64
    */
    id?: string;
    offer?: V1Offer;
};