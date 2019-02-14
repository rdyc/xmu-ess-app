import { ICollectionValue } from '@layout/classes/core';

import { AppUserManager } from './userManager';

const parseHeaders = (headers: Headers) => {
  const _headers: ICollectionValue[] = [];

  headers.forEach((v: string, k: string) => {
    _headers.push({
      name: k,
      value: v
    });
  });

  return _headers;
};

export interface IApiResponse {
  status: number;
  statusText: string;
  headers: ICollectionValue[];
  ok: boolean;
  body?: any;
}
export interface IApiErrorResponse {
  status: number;
  statusText: string;
  errorId: string;
  date: Date;
  reason: string | string[];
}

export async function apiRequest(method: string, url: string, path: string, payload?: any, isJsonContent?: boolean) {
  const user = await AppUserManager.getUser();
  
  let body = undefined;
  
  const useJson = isJsonContent === undefined ? false : isJsonContent;
  
  const headers = new Headers();

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

  // invoke fetch request
  try {
    const response = await fetch(url + path, { method, headers, body });
    const text = await response.text();

    const result: IApiResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: parseHeaders(response.headers),
      ok: response.ok,
      body: text.length > 0 ? JSON.parse(text) : undefined
    };

    return result;
  } catch (error) {
    throw error;
  }
}
