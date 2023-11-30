/* eslint-disable no-unreachable */
export const actioTypes = {
  openDropdown: "OPEN_DROPDOWN",
  closeDropdown: "CLOSE_DROPDOWN",
  toggleDropdown: "TOGGLE_DROPDOWN",
  openNotifications: "OPEN_NOTIFICATIONS",
  closeNotifications: "CLOSE_NOTIFICATIONS",
  toggleNotifications: "TOGGLE_NOTIFICATIONS",
  openSidebar: "OPEN_SIDEBAR",
  closeSidebar: "CLOSE_SIDEBAR",
  toggleSidebar: "TOGGLE_SIDEBAR",
  openFilterMenu: "OPEN_FILTER_MENU",
  closeFilterMenu: "CLOSE_FILTER_MENU",
  openEventFilters: "OPEN_EVENT_FILTER_MENU",
  closeEventFilters: "CLOSE_EVENT_FILTER_MENU",
  loginUser: "LOGIN_USER",
  logoutUser: "LOGOUT_USER",
};

export const uiReducer = (state, action) => {
  switch (action.type) {
    case actioTypes.openDropdown:
      return { ...state, isDropdownOpen: true };
    case actioTypes.closeDropdown:
      return { ...state, isDropdownOpen: false };
    case actioTypes.toggleDropdown:
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
    case actioTypes.openNotifications:
      return { ...state, isNotificationsOpen: true };
    case actioTypes.closeNotifications:
      return { ...state, isNotificationsOpen: false };
    case actioTypes.toggleNotifications:
      return { ...state, isNotificationsOpen: !state.isNotificationsOpen };
    case actioTypes.openSidebar:
      return { ...state, isSidebarOpen: true };
    case actioTypes.closeSidebar:
      return { ...state, isSidebarOpen: false };
    case actioTypes.toggleSidebar:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case actioTypes.openFilterMenu:
      return { ...state, isFilterMenuOpen: true };
    case actioTypes.closeFilterMenu:
      return { ...state, isFilterMenuOpen: false };
    case actioTypes.openEventFilters:
      return { ...state, isEventFiltersOpen: true };
    case actioTypes.closeEventFilters:
      return { ...state, isEventFiltersOpen: false };
    case actioTypes.loginUser:
      return { ...state, user: action.payload };
    case actioTypes.logoutUser:
      return { ...state, user: null };

    default:
      return state;
  }
};
