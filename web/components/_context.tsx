import constate from 'constate';
import useCookie from 'react-use-cookie';

type UserInfo = {
  userName: string;
  displayName: string;
  avatarUrl: string;
};

const defaultUserInfo = {
  userName: 'hongoverflower',
  displayName: 'Hong Flower',
  avatarUrl: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
};

export const useAuth = (): { userInfo: UserInfo; login: () => void; logout: () => void; isLoggedIn: boolean } => {
  const [userToken, setUserToken, removeUserToken] = useCookie('userInfo', '{}');
  const userInfo = JSON.parse(userToken ?? '{}');

  const login = () => {
    setUserToken(JSON.stringify(defaultUserInfo));
  };

  const logout = () => {
    removeUserToken();
  };

  return { userInfo, login, logout, isLoggedIn: !!Object.keys(userInfo).length };
};

const [AuthContext, useAuthContext] = constate(useAuth);

export {
  AuthContext,
  useAuthContext,
};
