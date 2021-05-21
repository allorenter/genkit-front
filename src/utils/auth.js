export const getAuthToken = () => localStorage.getItem('auth');

export const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${getAuthToken()}` }
});

export const setAuth = (token) => localStorage.setItem('auth', token);

export const removeAuth = () => localStorage.removeItem('auth');