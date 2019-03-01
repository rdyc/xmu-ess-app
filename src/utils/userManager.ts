import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

const location = window.location;

const selfHost = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;

const PopupCenter = (w: number, h: number): string => {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  // const width = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width);
  // const height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;

  const result = `directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`;

  console.log(result);
  return result;
};

const settings: UserManagerSettings = {
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  authority: process.env.REACT_APP_OAUTH_URL || '',
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  response_type: 'token id_token',
  // redirect_uri: `${selfHost}/callback`,
  popup_redirect_uri: `${selfHost}/signin`,
  popupWindowFeatures: PopupCenter(500, 600), 
  post_logout_redirect_uri: `${selfHost}`,
  silent_redirect_uri: `${selfHost}/silent_renew`,
  // automaticSilentRenew: true,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  userStore: new WebStorageStateStore({
    store: localStorage
  }),
  clockSkew: 900, // 15 mins
};

export const AppUserManager = createUserManager(settings);