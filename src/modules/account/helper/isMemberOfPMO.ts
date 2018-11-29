import { roleOfPMO } from './roleOfPMO';

export const isMemberOfPMO = (roleUid: string): boolean => {
  let result: boolean = false;
  
  const roleUids = roleOfPMO();

  if (roleUids.length > 0) {
    result = roleUids.indexOf(roleUid) !== -1;
  }

  return result;
};