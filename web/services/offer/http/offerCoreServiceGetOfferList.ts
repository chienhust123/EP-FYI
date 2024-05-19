import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceGetOfferListMutationRequest, OfferCoreServiceGetOfferListMutationResponse } from "../models/OfferCoreServiceGetOfferList";

 /**
 * @description If the request tries to filter for orders with non-`APPROVED` statuses, the requesting client's email address must bein the whitelisted list in the config for the request to be authorized.
 * @summary Get the list of offer entrys from the database that match the provided filter options.
 * @link /offer_service.v1.OfferCoreService/GetOfferList
 */
export async function offerCoreServiceGetOfferList(data?: OfferCoreServiceGetOfferListMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceGetOfferListMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceGetOfferListMutationResponse, OfferCoreServiceGetOfferListMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/GetOfferList`, data, ...options });
    return res.data;
}