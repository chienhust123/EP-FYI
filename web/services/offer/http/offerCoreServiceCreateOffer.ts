import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceCreateOfferMutationRequest, OfferCoreServiceCreateOfferMutationResponse } from "../models/OfferCoreServiceCreateOffer";

 /**
 * @summary Create a new offer entry in the database.
 * @link /offer_service.v1.OfferCoreService/CreateOffer
 */
export async function offerCoreServiceCreateOffer(data?: OfferCoreServiceCreateOfferMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceCreateOfferMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceCreateOfferMutationResponse, OfferCoreServiceCreateOfferMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/CreateOffer`, data, ...options });
    return res.data;
}