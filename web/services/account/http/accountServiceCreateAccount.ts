import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { AccountServiceCreateAccountMutationRequest, AccountServiceCreateAccountMutationResponse } from "../models/AccountServiceCreateAccount";

 /**
 * @link /account_core.AccountService/CreateAccount
 */
export async function accountServiceCreateAccount(data?: AccountServiceCreateAccountMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AccountServiceCreateAccountMutationResponse>["data"]> {
    const res = await client<AccountServiceCreateAccountMutationResponse, AccountServiceCreateAccountMutationRequest>({ method: "post", url: `/account_core.AccountService/CreateAccount`, data, ...options });
    return res.data;
}