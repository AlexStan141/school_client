export const getUsers = state => state.users.items;

export const getUsersLoading = state => state.users.isLoading;

export const getUsersError = state => state.users.error;

export const getCurrentUser = state => state.users.currentUser;

export const getToken = state => state.users.token;

export const getIsLoggedIn = state => state.users.isLoggedIn;

export const getIsRefreshing = state => state.users.isRefreshing;