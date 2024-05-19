import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { AccountServiceCreateAccountSessionMutationRequest, AccountServiceCreateAccountSessionMutationResponse } from "../models/AccountServiceCreateAccountSession";

 /**
 * @link /account_core.AccountService/CreateAccountSession
 */
export async function accountServiceCreateAccountSession(data?: AccountServiceCreateAccountSessionMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AccountServiceCreateAccountSessionMutationResponse>["data"]> {
    const res = await client<AccountServiceCreateAccountSessionMutationResponse, AccountServiceCreateAccountSessionMutationRequest>({ method: "post", url: `/account_core.AccountService/CreateAccountSession`, data, ...options });
    return res.data;
}