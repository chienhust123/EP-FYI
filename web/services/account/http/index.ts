
import apiClient from '../../api-client';
import {
  CreateAccountRequest, CreateAccountResponse,
  ModifyAccountRequest, ModifyAccountResponse,
  GetAccountRequest, GetAccountResponse,
  CreateAccountSessionRequest, CreateAccountSessionResponse,
  GetAccountSessionRequest, GetAccountSessionResponse,
} from '../types';

export const ACCOUNT_API_PATH = {
  CREATE_ACCOUNT: '/account/create_account',
  UPDATE_ACCOUNT: '/account/update_account',
  GET_ACCOUNT: '/account/get_account',
  CREATE_ACCOUNT_SESSION: '/account/create_account_session',
  GET_ACCOUNT_SESSION: '/account/get_account_session',
};


export const createAccount = async (data: CreateAccountRequest): Promise<CreateAccountResponse> => {
  const response = await apiClient.post<CreateAccountResponse>(ACCOUNT_API_PATH.CREATE_ACCOUNT, data);
  return response.data;
};

export const updateAccount = async (data: ModifyAccountRequest): Promise<ModifyAccountResponse> => {
  const response = await apiClient.post<ModifyAccountResponse>(ACCOUNT_API_PATH.UPDATE_ACCOUNT, data);
  return response.data;
};

export const getAccount = async (data: GetAccountRequest): Promise<GetAccountResponse> => {
  const response = await apiClient.post<GetAccountResponse>(ACCOUNT_API_PATH.GET_ACCOUNT, data);
  return response.data;
};

export const createAccountSession = async (data: CreateAccountSessionRequest): Promise<CreateAccountSessionResponse> => {
  const response = await apiClient.post<CreateAccountSessionResponse>(ACCOUNT_API_PATH.CREATE_ACCOUNT_SESSION, data);
  return response.data;
};

export const getAccountSession = async (data: GetAccountSessionRequest): Promise<GetAccountSessionResponse> => {
  const response = await apiClient.post<GetAccountSessionResponse>(ACCOUNT_API_PATH.GET_ACCOUNT_SESSION, data);
  return response.data;
};