import { RpcStatus } from "./RpcStatus";
import { AccountCoreVerifyAccountSessionRequest } from "./AccountCoreVerifyAccountSessionRequest";
import type { AccountCoreVerifyAccountSessionResponse } from "./AccountCoreVerifyAccountSessionResponse";

 /**
 * @description A successful response.
*/
export type AccountServiceVerifyAccountSession200 = AccountCoreVerifyAccountSessionResponse;
/**
 * @description An unexpected error response.
*/
export type AccountServiceVerifyAccountSessionError = RpcStatus;
export type AccountServiceVerifyAccountSessionMutationRequest = AccountCoreVerifyAccountSessionRequest;
/**
 * @description A successful response.
*/
export type AccountServiceVerifyAccountSessionMutationResponse = AccountCoreVerifyAccountSessionResponse;
export type AccountServiceVerifyAccountSessionMutation = {
    Response: AccountServiceVerifyAccountSessionMutationResponse;
    Request: AccountServiceVerifyAccountSessionMutationRequest;
};