import { useMutation } from '@tanstack/react-query';
import constate from 'constate';
import { isEmpty, isNotEmpty } from 'ramda';
import { Account, useGetAccountSession } from '@/services/account';

type ReturnTypeUseAuth = {
  account: Account | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean
}

export const useAuth = (): ReturnTypeUseAuth => {
  const { isLoading, data } = useGetAccountSession({});

  const { mutate } = useMutation({
    // @TODO check with BE on the API
    mutationFn: () => Promise.resolve(),
  })

  const account = isNotEmpty(data?.account) ? (data?.account ?? null) : null

  const login = () => {
    // @TODO double check on the flow

    window.location.href = '/auth/google/login';
  };

  const logout = () => {
    mutate();
  };

  return {
    account,
    loading: isLoading,
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
