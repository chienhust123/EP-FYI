import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceUpdateCompanyMutationRequest, OfferCoreServiceUpdateCompanyMutationResponse } from "../models/OfferCoreServiceUpdateCompany";

 /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 * @summary Update a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly editpopular company entries for auto suggestion on the front end.
 * @link /offer_service.v1.OfferCoreService/UpdateCompany
 */
export async function offerCoreServiceUpdateCompany(data?: OfferCoreServiceUpdateCompanyMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceUpdateCompanyMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceUpdateCompanyMutationResponse, OfferCoreServiceUpdateCompanyMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/UpdateCompany`, data, ...options });
    return res.data;
}