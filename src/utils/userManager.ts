import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

const location = window.location;

const selfHost = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;

const PopupCenter = (w: number, h: number): string => {
  const left = (window.screen.width - w) / 2;
  const top = (window.screen.height - h) / 2;

  const result = `directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`;

  return result;
};

const settings: UserManagerSettings = {
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  authority: process.env.REACT_APP_OAUTH_URL || '',
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  response_type: 'token id_token',
  // redirect_uri: `${selfHost}/callback`,
  popup_redirect_uri: `${selfHost}/signin`,
  popupWindowFeatures: PopupCenter(450, 500), 
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