
type Token = string | null

let accessToken: Token = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: Token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};