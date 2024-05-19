import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { OfferCoreServiceCreateCompanyProfileImageMutationRequest, OfferCoreServiceCreateCompanyProfileImageMutationResponse } from "../models/OfferCoreServiceCreateCompanyProfileImage";

 /**
 * @description The requesting client's email address must be in the whitelisted list in the config for the request to be authorized.
 * @summary Create a new company image entry in the database, and returns a S3 presigned URL that can be used by the client toupload an image, which can be associated with a company in the future. This API endpoint is provided to allow adminusers a mean to quickly create/update popular company entries for auto suggestion on the front end.
 * @link /offer_service.v1.OfferCoreService/CreateCompanyProfileImage
 */
export async function offerCoreServiceCreateCompanyProfileImage(data?: OfferCoreServiceCreateCompanyProfileImageMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<OfferCoreServiceCreateCompanyProfileImageMutationResponse>["data"]> {
    const res = await client<OfferCoreServiceCreateCompanyProfileImageMutationResponse, OfferCoreServiceCreateCompanyProfileImageMutationRequest>({ method: "post", url: `/offer_service.v1.OfferCoreService/CreateCompanyProfileImage`, data, ...options });
    return res.data;
}