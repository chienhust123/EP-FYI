import { RpcStatus } from "./RpcStatus";
import { AccountCoreCreateAccountSessionRequest } from "./AccountCoreCreateAccountSessionRequest";
import type { AccountCoreCreateAccountSessionResponse } from "./AccountCoreCreateAccountSessionResponse";

 /**
 * @description A successful response.
*/
export type AccountServiceCreateAccountSession200 = AccountCoreCreateAccountSessionResponse;
/**
 * @description An unexpected error response.
*/
export type AccountServiceCreateAccountSessionError = RpcStatus;
export type AccountServiceCreateAccountSessionMutationRequest = AccountCoreCreateAccountSessionRequest;
/**
 * @description A successful response.
*/
export type AccountServiceCreateAccountSessionMutationResponse = AccountCoreCreateAccountSessionResponse;
export type AccountServiceCreateAccountSessionMutation = {
    Response: AccountServiceCreateAccountSessionMutationResponse;
    Request: AccountServiceCreateAccountSessionMutationRequest;
};