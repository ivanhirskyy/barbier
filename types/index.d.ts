export type TAuthResponseSuccess = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
  };
};

export type TAuthResponseError = {
  data: null;
  error: {
    status: number;
    message: string;
    name: string;
  };
};

export type TAuthResponse = TAuthResponseSuccess | TAuthResponseError;
