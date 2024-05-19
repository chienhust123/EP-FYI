import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { AccountServiceGetAccountMutationRequest, AccountServiceGetAccountMutationResponse } from "../models/AccountServiceGetAccount";

 /**
 * @link /account_core.AccountService/GetAccount
 */
export async function accountServiceGetAccount(data?: AccountServiceGetAccountMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AccountServiceGetAccountMutationResponse>["data"]> {
    const res = await client<AccountServiceGetAccountMutationResponse, AccountServiceGetAccountMutationRequest>({ method: "post", url: `/account_core.AccountService/GetAccount`, data, ...options });
    return res.data;
}