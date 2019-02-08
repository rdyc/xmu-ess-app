import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

const location = window.location;

const selfHost = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;

const settings: UserManagerSettings = {
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  authority: process.env.REACT_APP_OAUTH_URL || '',
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  response_type: 'token id_token',
  // redirect_uri: `${selfHost}/callback`,
  popup_redirect_uri: `${selfHost}/signin`,
  post_logout_redirect_uri: `${selfHost}`,
  silent_redirect_uri: `${selfHost}/silent_renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  userStore: new WebStorageStateStore({
    store: localStorage
  }),
  clockSkew: 900, // 15 mins  
};

export const AppUserManager = createUserManager(settings);