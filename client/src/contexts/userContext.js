import { createContext, useReducer } from "react";
import jwt from 'jsonwebtoken'
import { setAuthToken } from "../config/api";

export const UserContext = createContext();

const token = localStorage.getItem('token')
const userData = null

const initialState = {
  isLogin: token ? true : false,
  userData
}

if (token) {
  setAuthToken(token)
  initialState.userData = jwt.decode(token)
}

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      if (payload) localStorage.setItem('token', payload.token)
      return {
        ...state,
        isLogin: true,
        userData: jwt.decode(payload.token)
      };
    case "LOGOUT":
      localStorage.removeItem('token')
      return {
        ...state,
        isLogin: false,
        userData: null
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
