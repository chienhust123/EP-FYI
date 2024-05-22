import {
  CreateAccountRequest, CreateAccountResponse,
  ModifyAccountRequest, ModifyAccountResponse,
  GetAccountRequest, GetAccountResponse,
  CreateAccountSessionRequest, CreateAccountSessionResponse,
  GetAccountSessionRequest, GetAccountSessionResponse,
} from '../types';

import { createAccount, createAccountSession, updateAccount, getAccount, getAccountSession } from '../http'
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';


export const useCreateAccount = (options?: UseMutationOptions<CreateAccountResponse, unknown, CreateAccountRequest>) => {
  return useMutation<CreateAccountResponse, unknown, CreateAccountRequest>({
    mutationFn: createAccount,
    ...options,
  });
};

export const useUpdateAccount = (options?: UseMutationOptions<ModifyAccountResponse, unknown, ModifyAccountRequest>) => {
  return useMutation<ModifyAccountResponse, unknown, ModifyAccountRequest>({
    mutationFn: updateAccount,
    ...options,
  });
};

export const useGetAccount = (data: GetAccountRequest, options?: UseQueryOptions<GetAccountResponse>) => {
  return useQuery<GetAccountResponse>({
    queryKey: ['getAccount', data],
    queryFn: () => getAccount(data),
    ...options,
  });
};

export const useCreateAccountSession = (options?: UseMutationOptions<CreateAccountSessionResponse, unknown, CreateAccountSessionRequest>) => {
  return useMutation<CreateAccountSessionResponse, unknown, CreateAccountSessionRequest>({
    mutationFn: createAccountSession,
    ...options,
  });
};

export const useGetAccountSession = (data: GetAccountSessionRequest, options?: UseQueryOptions<GetAccountSessionResponse>) => {
  return useQuery<GetAccountSessionResponse>({
    queryKey: ['getAccountSession', data],
    queryFn: () => getAccountSession(data),
    ...options,
  });
};