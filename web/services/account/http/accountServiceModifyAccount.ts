import client from "../../api-client";
import type { ResponseConfig } from "../../api-client";
import type { AccountServiceModifyAccountMutationRequest, AccountServiceModifyAccountMutationResponse } from "../models/AccountServiceModifyAccount";

 /**
 * @link /account_core.AccountService/ModifyAccount
 */
export async function accountServiceModifyAccount(data?: AccountServiceModifyAccountMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<AccountServiceModifyAccountMutationResponse>["data"]> {
    const res = await client<AccountServiceModifyAccountMutationResponse, AccountServiceModifyAccountMutationRequest>({ method: "post", url: `/account_core.AccountService/ModifyAccount`, data, ...options });
    return res.data;
}