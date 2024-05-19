import constate from 'constate';

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
  const userInfo = JSON.parse('{}');

  const login = () => {
  };

  const logout = () => {
  };

  return { userInfo, login, logout, isLoggedIn: !!Object.keys(userInfo).length };
};

const [AuthContext, useAuthContext] = constate(useAuth);

export {
  AuthContext,
  useAuthContext,
};
