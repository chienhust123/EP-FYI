import { RpcStatus } from "./RpcStatus";
import { V1CreateCompanyRequest } from "./V1CreateCompanyRequest";
import type { V1CreateCompanyResponse } from "./V1CreateCompanyResponse";

 /**
 * @description A successful response.
*/
export type OfferCoreServiceCreateCompany200 = V1CreateCompanyResponse;
/**
 * @description An unexpected error response.
*/
export type OfferCoreServiceCreateCompanyError = RpcStatus;
export type OfferCoreServiceCreateCompanyMutationRequest = V1CreateCompanyRequest;
/**
 * @description A successful response.
*/
export type OfferCoreServiceCreateCompanyMutationResponse = V1CreateCompanyResponse;
export type OfferCoreServiceCreateCompanyMutation = {
    Response: OfferCoreServiceCreateCompanyMutationResponse;
    Request: OfferCoreServiceCreateCompanyMutationRequest;
};