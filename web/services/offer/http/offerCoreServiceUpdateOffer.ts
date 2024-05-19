import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceUpdateOfferMutationRequest, OfferCoreServiceUpdateOfferMutationResponse } from "../models/OfferCoreServiceUpdateOffer";

 /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 * @summary Update the status of an offer entry in the database.
 * @link /offer_service.v1.OfferCoreService/UpdateOffer
 */
export async function offerCoreServiceUpdateOffer(data?: OfferCoreServiceUpdateOfferMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceUpdateOfferMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceUpdateOfferMutationResponse, OfferCoreServiceUpdateOfferMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/UpdateOffer`, data, ...options });
    return res.data;
}