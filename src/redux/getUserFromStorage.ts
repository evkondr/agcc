const getUserFromStorage = (str: 'demoToken' | 'token') => {
  return localStorage.getItem(str);
};
export default getUserFromStorage;
