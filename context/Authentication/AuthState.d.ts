interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  remember: boolean;
}

interface AuthUser {
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthDispatchAction {
  type: AuthDispatchTypes;
  payload: AuthState;
}

interface AuthContextProps extends AuthState {
  dispatch: Dispatch<AuthDispatchAction>;
}
