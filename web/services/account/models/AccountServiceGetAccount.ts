import { RpcStatus } from "./RpcStatus";
import { AccountCoreGetAccountRequest } from "./AccountCoreGetAccountRequest";
import type { AccountCoreGetAccountResponse } from "./AccountCoreGetAccountResponse";

 /**
 * @description A successful response.
*/
export type AccountServiceGetAccount200 = AccountCoreGetAccountResponse;
/**
 * @description An unexpected error response.
*/
export type AccountServiceGetAccountError = RpcStatus;
export type AccountServiceGetAccountMutationRequest = AccountCoreGetAccountRequest;
/**
 * @description A successful response.
*/
export type AccountServiceGetAccountMutationResponse = AccountCoreGetAccountResponse;
export type AccountServiceGetAccountMutation = {
    Response: AccountServiceGetAccountMutationResponse;
    Request: AccountServiceGetAccountMutationRequest;
};