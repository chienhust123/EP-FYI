import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { AccountServiceVerifyAccountSessionMutationRequest, AccountServiceVerifyAccountSessionMutationResponse } from "../models/AccountServiceVerifyAccountSession";

 /**
 * @link /account_core.AccountService/VerifyAccountSession
 */
export async function accountServiceVerifyAccountSession(data?: AccountServiceVerifyAccountSessionMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AccountServiceVerifyAccountSessionMutationResponse>["data"]> {
    const res = await client<AccountServiceVerifyAccountSessionMutationResponse, AccountServiceVerifyAccountSessionMutationRequest>({ method: "post", url: `/account_core.AccountService/VerifyAccountSession`, data, ...options });
    return res.data;
}