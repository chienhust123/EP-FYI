import { AccountCoreAccount, accountServiceGetAccount } from '@/services/account';
import { useMutation, useQuery } from '@tanstack/react-query';
import constate from 'constate';
import { useState } from 'react';
import { isEmpty } from 'ramda';

type ReturnTypeUseAuth = {
  account: AccountCoreAccount | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean
}

export const useAuth = (): ReturnTypeUseAuth => {
  const { isFetching, data } = useQuery({
    queryKey: ['account'],
    // @TODO double check with BE on the API
    queryFn: () => accountServiceGetAccount()
  });

  const { mutate } = useMutation({
    // @TODO check with BE on the API
    mutationFn: () => Promise.resolve(),
  })

  const account = isEmpty(data?.account) ? null : data?.account ?? null

  const login = () => {
    // @TODO double check on the flow

    window.location.href = '/auth/google/login';
  };

  const logout = () => {
    mutate();
  };

  return {
    account,
    loading: isFetching,
    login,
    logout,
    isLoggedIn: !!account
  }
};

const [AuthContext, useAuthContext] = constate(useAuth);

export {
  AuthContext,
  useAuthContext,
};
