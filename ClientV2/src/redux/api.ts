export const url: string = "http://localhost:5005/api";

interface HeadersConfig {
  headers: {
    "x-auth-token": string | null;
  };
}

export const setHeaders = (): HeadersConfig => {
  const headers: HeadersConfig = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
