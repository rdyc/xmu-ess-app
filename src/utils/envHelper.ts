export enum IFieldEnvHelper {
  OAuth = 'oauth',
  ClientId = 'clientId',
  ClientSecret = 'clientSecret',
  ApiUrl = 'apiUrl',
  WebJobApiUrl = 'webJobApiUrl',
  RoleIdsDirector = 'roleIdsDirector',
  RoleIdsSales = 'roleIdsSales',
  RoleIdsPm = 'roleIdsPm',
  RoleIdsPmo = 'roleIdsPmo',
  AndroidId = 'androidId',
  CdnHost = 'cdnHost'
}

export const envHelper = (field: IFieldEnvHelper, hostname: string) => {
  if (hostname === process.env.REACT_APP_HOST_LOCAL) {
    switch (field) {
      case IFieldEnvHelper.OAuth : return process.env.REACT_APP_LOCAL_OAUTH_URL;
      
      case IFieldEnvHelper.ClientId : return process.env.REACT_APP_LOCAL_CLIENT_ID;
      case IFieldEnvHelper.ClientSecret : return process.env.REACT_APP_LOCAL_CLIENT_SECRET;
      
      case IFieldEnvHelper.ApiUrl : return process.env.REACT_APP_LOCAL_API_URL;
      case IFieldEnvHelper.WebJobApiUrl : return process.env.REACT_APP_LOCAL_WEBJOB_API_URL;
      
      case IFieldEnvHelper.RoleIdsDirector : return process.env.REACT_APP_LOCAL_ROLE_IDS_DIRECTORS;
      case IFieldEnvHelper.RoleIdsSales : return process.env.REACT_APP_LOCAL_ROLE_IDS_SALES;
      case IFieldEnvHelper.RoleIdsPm : return process.env.REACT_APP_LOCAL_ROLE_IDS_PM;
      case IFieldEnvHelper.RoleIdsPmo : return process.env.REACT_APP_LOCAL_ROLE_IDS_PMO;
      case IFieldEnvHelper.AndroidId : return process.env.REACT_APP_LOCAL_ANDROID_CLIENT_ID;
      case IFieldEnvHelper.CdnHost : return process.env.REACT_APP_LOCAL_CDN_HOST;

      default: return;
    }
  }

  if (hostname === process.env.REACT_APP_HOST_DEV) {
    switch (field) {
      case IFieldEnvHelper.OAuth: return process.env.REACT_APP_DEV_OAUTH_URL;
      
      case IFieldEnvHelper.ClientId : return process.env.REACT_APP_DEV_CLIENT_ID;
      case IFieldEnvHelper.ClientSecret : return process.env.REACT_APP_DEV_CLIENT_SECRET;
      
      case IFieldEnvHelper.ApiUrl : return process.env.REACT_APP_DEV_API_URL;
      case IFieldEnvHelper.WebJobApiUrl : return process.env.REACT_APP_DEV_WEBJOB_API_URL;
      
      case IFieldEnvHelper.RoleIdsDirector : return process.env.REACT_APP_DEV_ROLE_IDS_DIRECTORS;
      case IFieldEnvHelper.RoleIdsSales : return process.env.REACT_APP_DEV_ROLE_IDS_SALES;
      case IFieldEnvHelper.RoleIdsPm : return process.env.REACT_APP_DEV_ROLE_IDS_PM;
      case IFieldEnvHelper.RoleIdsPmo : return process.env.REACT_APP_DEV_ROLE_IDS_PMO;
      case IFieldEnvHelper.AndroidId : return process.env.REACT_APP_DEV_ANDROID_CLIENT_ID;
      case IFieldEnvHelper.CdnHost : return process.env.REACT_APP_DEV_CDN_HOST;

      default: return;
    }
  }

  if (hostname === process.env.REACT_APP_HOST_STG) {
    switch (field) {
      case IFieldEnvHelper.OAuth: return process.env.REACT_APP_STG_OAUTH_URL;
      
      case IFieldEnvHelper.ClientId : return process.env.REACT_APP_STG_CLIENT_ID;
      case IFieldEnvHelper.ClientSecret : return process.env.REACT_APP_STG_CLIENT_SECRET;
      
      case IFieldEnvHelper.ApiUrl : return process.env.REACT_APP_STG_API_URL;
      case IFieldEnvHelper.WebJobApiUrl : return process.env.REACT_APP_STG_WEBJOB_API_URL;
      
      case IFieldEnvHelper.RoleIdsDirector : return process.env.REACT_APP_STG_ROLE_IDS_DIRECTORS;
      case IFieldEnvHelper.RoleIdsSales : return process.env.REACT_APP_STG_ROLE_IDS_SALES;
      case IFieldEnvHelper.RoleIdsPm : return process.env.REACT_APP_STG_ROLE_IDS_PM;
      case IFieldEnvHelper.RoleIdsPmo : return process.env.REACT_APP_STG_ROLE_IDS_PMO;
      case IFieldEnvHelper.AndroidId : return process.env.REACT_APP_STG_ANDROID_CLIENT_ID;
      case IFieldEnvHelper.CdnHost : return process.env.REACT_APP_STG_CDN_HOST;

      default: return;
    }
  }

  if (hostname === process.env.REACT_APP_HOST_PRD) {
    switch (field) {
      case IFieldEnvHelper.OAuth: return process.env.REACT_APP_PRD_OAUTH_URL;
      
      case IFieldEnvHelper.ClientId : return process.env.REACT_APP_PRD_CLIENT_ID;
      case IFieldEnvHelper.ClientSecret : return process.env.REACT_APP_PRD_CLIENT_SECRET;
      
      case IFieldEnvHelper.ApiUrl : return process.env.REACT_APP_PRD_API_URL;
      case IFieldEnvHelper.WebJobApiUrl : return process.env.REACT_APP_PRD_WEBJOB_API_URL;
      
      case IFieldEnvHelper.RoleIdsDirector : return process.env.REACT_APP_PRD_ROLE_IDS_DIRECTORS;
      case IFieldEnvHelper.RoleIdsSales : return process.env.REACT_APP_PRD_ROLE_IDS_SALES;
      case IFieldEnvHelper.RoleIdsPm : return process.env.REACT_APP_PRD_ROLE_IDS_PM;
      case IFieldEnvHelper.RoleIdsPmo : return process.env.REACT_APP_PRD_ROLE_IDS_PMO;
      case IFieldEnvHelper.AndroidId : return process.env.REACT_APP_PRD_ANDROID_CLIENT_ID;
      case IFieldEnvHelper.CdnHost : return process.env.REACT_APP_PRD_CDN_HOST;

      default: return;
    }
  }

  return;
};