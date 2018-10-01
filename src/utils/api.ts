import { AppUserManager } from './userManager';

export interface IApiHeaders {
  key: string;
  value: string;
}

const parseHeaders = (headers: Headers) => {
  const _headers: IApiHeaders[] = [];

  headers.forEach((v: string, k: string) => {
    _headers.push({
      key: k,
      value: v
    });
  });

  return _headers;
};

export interface IApiResponse {
  status: number;
  statusText: string;
  headers: IApiHeaders[];
  ok: boolean;
  body: any;
}

export async function apiRequest(method: string, url: string, path: string, payload?: any) {
  const user = await AppUserManager.getUser();
  
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  // add acces token
  if (user !== null) {
    headers.append('Authorization',  `Bearer ${user.access_token}`);
  }

  return fetch(url + path, {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined
  })
  .then(response => response.json()
    .then(result => ({
      status: response.status,
      statusText: response.statusText,
      headers: parseHeaders(response.headers),
      ok: response.ok,
      body: result
    })
  ))
  .catch((error: TypeError) => {
    switch (error.message) {
      case 'Failed to fetch':
        throw TypeError(`${error.message}, please check your network connection`);

      default:
        throw error;
    }
  });
}
