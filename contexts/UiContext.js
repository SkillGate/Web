import { createContext, useContext, useReducer } from "react";
import { actioTypes, uiReducer } from "../reducers/uiReducer";

export const UiContext = createContext();

const initialState = {
  isDropdownOpen: false,
  isNotificationsOpen: false,
  isSidebarOpen: false,
  isFilterMenuOpen: false,
  isEventFiltersOpen: false,
  user: null,
};

export const UiProvider = ({ children }) => {
  const [ui, dispatch] = useReducer(uiReducer, initialState);

  const loginUser = (userData) => {
    dispatch({ type: actioTypes.loginUser, payload: userData });
  };

  const logoutUser = () => {
    dispatch({ type: actioTypes.logoutUser });
  };

  return (
    <UiContext.Provider value={{ ...ui, dispatch, loginUser, logoutUser }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
