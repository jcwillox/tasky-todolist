import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect
} from "react";
import { NewUser, User } from "../models/user";
import { LoginBody, LoginResponse } from "../models/login";
import { api, apiJSON, ApiError } from "../utils/fetch";
import { useLocalStorageState } from "use-local-storage-state";

const useProvideAuth = () => {
  const [user, setUser, { removeItem }] = useLocalStorageState<User>("user");

  const login = useCallback(
    async (credentials: LoginBody) => {
      const data: LoginResponse = await apiJSON("/login", credentials);
      localStorage.setItem("token", data.token);

      let user: User = data;
      delete user["token"];

      setUser(user);
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    localStorage.removeItem("token");
    removeItem();
  }, [removeItem]);

  const register = useCallback(
    async (details: NewUser) => {
      await api("/register", { data: details });
      return login(details);
    },
    [login]
  );

  const validate = useCallback(async () => {
    try {
      const user = await apiJSON("/validate");
      setUser(user);
    } catch (err) {
      if (err instanceof ApiError && err.res.status === 401) {
        await logout();
      } else {
        // an error other than unauthorised means something actually
        // went wrong so re-raise the error to be handled elsewhere
        throw err;
      }
    }
  }, [logout, setUser]);

  // kick-off background check that the user is still authenticated
  useEffect(() => {
    validate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    login,
    logout,
    register,
    validate
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext({} as ReturnType<typeof useProvideAuth>);

export const ProvideAuth: FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
