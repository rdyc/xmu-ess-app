import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

const location = window.location;

const selfHost = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;

const settings: UserManagerSettings = {
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  authority: process.env.REACT_APP_OAUTH_URL || '',
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  response_type: 'token id_token',
  redirect_uri: `${selfHost}/callback`,
  silent_redirect_uri: `${selfHost}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true,
  userStore: new WebStorageStateStore({
    store: localStorage
  })
};

export const AppUserManager = createUserManager(settings);