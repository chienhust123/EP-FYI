import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceGetOfferMutationRequest, OfferCoreServiceGetOfferMutationResponse } from "../models/OfferCoreServiceGetOffer";

 /**
 * @description If the requested offer's status is not `APPROVED`, the requesting client's email address must be in the whitelistedlist in the config for the request to be authorized.
 * @summary Get an offer entry from the database.
 * @link /offer_service.v1.OfferCoreService/GetOffer
 */
export async function offerCoreServiceGetOffer(data?: OfferCoreServiceGetOfferMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceGetOfferMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceGetOfferMutationResponse, OfferCoreServiceGetOfferMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/GetOffer`, data, ...options });
    return res.data;
}