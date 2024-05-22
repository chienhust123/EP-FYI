
export type Account = {
  id?: number;
  email?: string;
  name?: string;
  picture?: string;
  created_at?: string;
  updated_at?: string;
};

export type CreateAccountRequest = {
  account?: Account;
};

export type CreateAccountResponse = {
  account?: Account;
};

export type ModifyAccountRequest = {
  account?: Account;
};

export type ModifyAccountResponse = {
  account?: Account;
};

export type GetAccountRequest = {
  account_id?: number;
};

export type GetAccountResponse = {
  account?: Account;
};

export type AccountSession = {
  token?: string;
  expiry_time_ms?: number;
  account_id?: number;
};

export type CreateAccountSessionRequest = {
  account_id?: number;
};

export type CreateAccountSessionResponse = {
  session?: AccountSession;
};

export type DeleteAccountSessionRequest = {
  account_id?: number;
};

export type DeleteAccountSessionResponse = {
  session?: AccountSession;
};

export type GetAccountSessionRequest = {
  token?: string;
};

export type GetAccountSessionResponse = {
  is_valid?: boolean;
  account?: Account;
};