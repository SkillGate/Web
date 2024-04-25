import { createContext, useContext, useEffect, useReducer } from "react";
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

  useEffect(() => {
    // Load persisted state from localStorage
    const persistedState = localStorage.getItem("uiState");
    if (persistedState) {
      dispatch({
        type: actioTypes.hydrateState,
        payload: JSON.parse(persistedState),
      });
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("uiState", JSON.stringify(ui));
  }, [ui]);

  const loginUser = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    dispatch({ type: actioTypes.loginUser, payload: userData });
  };

  const logoutUser = () => {
    localStorage.removeItem("userData");
    dispatch({ type: actioTypes.logoutUser });
  };

  return (
    <UiContext.Provider value={{ ...ui, dispatch, loginUser, logoutUser }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
