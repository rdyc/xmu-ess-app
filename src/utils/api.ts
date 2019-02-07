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

export async function apiRequest(method: string, url: string, path: string, payload?: any, isJsonContent?: boolean) {
  const user = await AppUserManager.getUser();
  const headers = new Headers();
  let body = undefined;
  const useJson = isJsonContent === undefined ? false : isJsonContent;
  
  headers.append('Accept', 'application/json');

  if (useJson) {
    headers.append('Content-Type', 'application/json');
    
    body = payload ? JSON.stringify(payload) : undefined;
  } else {
    body = payload;
  }

  // add acces token
  if (user !== null) {
    headers.append('Authorization',  `Bearer ${user.access_token}`);
  }

  return fetch(url + path, {
    method,
    headers,
    body
  })
  .then(response => 
    response.json()
      .then(result => ({
        status: response.status,
        statusText: response.statusText,
        headers: parseHeaders(response.headers),
        ok: response.ok,
        body: result
      }))
      .catch(reason => {
        if (response.status === 204) {
          console.info(`204:No-Content => [${method}] ${url}${path}`);

          return {
            status: response.status,
            statusText: response.statusText,
            headers: parseHeaders(response.headers),
            ok: response.ok,
            body: undefined
          };
        // tslint:disable-next-line:no-else-after-return
        } else {
          throw TypeError(reason);
        }
      })
  )
  .catch((error: TypeError) => {
    switch (error.message) {
      case 'Failed to fetch':
        throw TypeError(`${error.message}, please check your network connection`);

      default:
        throw error;
    }
  });
}
