import { RpcStatus } from "./RpcStatus";
import { AccountCoreCreateAccountRequest } from "./AccountCoreCreateAccountRequest";
import type { AccountCoreCreateAccountResponse } from "./AccountCoreCreateAccountResponse";

 /**
 * @description A successful response.
*/
export type AccountServiceCreateAccount200 = AccountCoreCreateAccountResponse;
/**
 * @description An unexpected error response.
*/
export type AccountServiceCreateAccountError = RpcStatus;
export type AccountServiceCreateAccountMutationRequest = AccountCoreCreateAccountRequest;
/**
 * @description A successful response.
*/
export type AccountServiceCreateAccountMutationResponse = AccountCoreCreateAccountResponse;
export type AccountServiceCreateAccountMutation = {
    Response: AccountServiceCreateAccountMutationResponse;
    Request: AccountServiceCreateAccountMutationRequest;
};