import { RpcStatus } from "./RpcStatus";
import { AccountCoreModifyAccountRequest } from "./AccountCoreModifyAccountRequest";
import type { AccountCoreModifyAccountResponse } from "./AccountCoreModifyAccountResponse";

 /**
 * @description A successful response.
*/
export type AccountServiceModifyAccount200 = AccountCoreModifyAccountResponse;
/**
 * @description An unexpected error response.
*/
export type AccountServiceModifyAccountError = RpcStatus;
export type AccountServiceModifyAccountMutationRequest = AccountCoreModifyAccountRequest;
/**
 * @description A successful response.
*/
export type AccountServiceModifyAccountMutationResponse = AccountCoreModifyAccountResponse;
export type AccountServiceModifyAccountMutation = {
    Response: AccountServiceModifyAccountMutationResponse;
    Request: AccountServiceModifyAccountMutationRequest;
};