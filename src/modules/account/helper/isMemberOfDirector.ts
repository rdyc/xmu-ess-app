import { envHelper, IFieldEnvHelper } from '@utils/envHelper';

const hostname: string = document && document.location && document.location.hostname || process.env.REACT_APP_HOST_LOCAL || '';

const roleUids = envHelper(IFieldEnvHelper.RoleIdsDirector, hostname);

export const isMemberOfDirector = (roleUid: string): boolean => {
  let result: boolean = false;

  if (roleUids) {
    const uids = roleUids.split(' ');

    result = uids.indexOf(roleUid) !== -1;
  }

  return result;
};