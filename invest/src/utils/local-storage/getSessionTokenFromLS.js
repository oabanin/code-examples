export function getSessionTokenFromLS() {
  return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.sessionToken;
}
