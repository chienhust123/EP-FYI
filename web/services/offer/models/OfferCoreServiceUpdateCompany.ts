import { RpcStatus } from "./RpcStatus";
import { V1UpdateCompanyRequest } from "./V1UpdateCompanyRequest";
import type { V1UpdateCompanyResponse } from "./V1UpdateCompanyResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceUpdateCompany200 = V1UpdateCompanyResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceUpdateCompanyError = RpcStatus;
export type OfferCoreServiceUpdateCompanyMutationRequest = V1UpdateCompanyRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceUpdateCompanyMutationResponse = V1UpdateCompanyResponse;
export type OfferCoreServiceUpdateCompanyMutation = {
    Response: OfferCoreServiceUpdateCompanyMutationResponse;
    Request: OfferCoreServiceUpdateCompanyMutationRequest;
};