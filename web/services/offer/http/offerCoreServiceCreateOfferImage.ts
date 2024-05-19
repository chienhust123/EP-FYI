import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceCreateOfferImageMutationRequest, OfferCoreServiceCreateOfferImageMutationResponse } from "../models/OfferCoreServiceCreateOfferImage";

 /**
 * @summary Create a new offer image entry in the database, and returns a S3 presigned URL that can be used by the client toupload an image, which can be associated with an offer in the future.
 * @link /offer_service.v1.OfferCoreService/CreateOfferImage
 */
export async function offerCoreServiceCreateOfferImage(data?: OfferCoreServiceCreateOfferImageMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceCreateOfferImageMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceCreateOfferImageMutationResponse, OfferCoreServiceCreateOfferImageMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/CreateOfferImage`, data, ...options });
    return res.data;
}