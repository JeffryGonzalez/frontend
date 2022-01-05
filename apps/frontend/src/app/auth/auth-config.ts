import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://gate.maglev.training/auth/realms/maglev',

  clientId: 'angular-client', // The "Auth Code + PKCE" client
  responseType: 'code',
  redirectUri: window.location.origin + '/',
  // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email offline_access', // Ask offline_access to support refresh token refreshes
  // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  // strictDiscoveryDocumentValidation: false,

  disableAtHashCheck: true,
  // sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  // nonceStateSeparator : 'space' // Real semicolon gets mangled by IdentityServer's URI encoding
};
