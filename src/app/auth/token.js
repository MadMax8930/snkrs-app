// Retrieve token from local storage
export const isAuthenticated = () => {
   const token = localStorage.getItem('token');
   return token;
};