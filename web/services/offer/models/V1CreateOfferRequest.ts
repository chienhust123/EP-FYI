import { V1Company } from "./V1Company";
import { OfferServicev1Location } from "./OfferServicev1Location";
import { V1Position } from "./V1Position";
import { V1MonetaryValue } from "./V1MonetaryValue";

 export type V1CreateOfferRequest = {
    company?: V1Company;
    location?: OfferServicev1Location;
    position?: V1Position;
    totalPackage?: V1MonetaryValue;
    /**
     * @description Must be an image ID returned by the CreateOfferImage API, and the presigned URL associated with that image inside our database must\nhave an image uploaded to it.
     * @type string | undefined, uint64
    */
    imageId?: string;
};