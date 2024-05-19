import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceCreateCompanyMutationRequest, OfferCoreServiceCreateCompanyMutationResponse } from "../models/OfferCoreServiceCreateCompany";

 /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 * @summary Create a new company entry in the database. This API endpoint is provided to allow admin users a mean to quickly addpopular company entries for auto suggestion on the front end - regular users can create new company entries for newlycreated offer if the associating company does not exist.
 * @link /offer_service.v1.OfferCoreService/CreateCompany
 */
export async function offerCoreServiceCreateCompany(data?: OfferCoreServiceCreateCompanyMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceCreateCompanyMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceCreateCompanyMutationResponse, OfferCoreServiceCreateCompanyMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/CreateCompany`, data, ...options });
    return res.data;
}