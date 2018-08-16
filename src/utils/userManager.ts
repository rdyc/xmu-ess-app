import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  authority: process.env.REACT_APP_OAUTH_URL || '',
  response_type: 'token id_token',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  scope: process.env.REACT_APP_OAUTH_SCOPES,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;