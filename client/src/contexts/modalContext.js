import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  isVisibleLogin: false,
  isVisibleRegister: false
};

const reducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case "SHOW_LOGIN_MODAL":
      return {
        ...state,
        isVisibleRegister: false,
        isVisibleLogin: true
      };
    case "SHOW_REGISTER_MODAL":
      return {
        ...state,
        isVisibleLogin: false,
        isVisibleRegister: true,
      };
    case "HIDE_LOGIN_MODAL":
      return {
        ...state,
        isVisibleLogin: false,
      };
      case "HIDE_REGISTER_MODAL":
    return {
      ...state,
      isVisibleRegister: false,
    };
    default:
      throw new Error();
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {children}
    </ModalContext.Provider>
  );
};
