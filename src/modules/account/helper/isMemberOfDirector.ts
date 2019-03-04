const roleUids = process.env.REACT_APP_ROLE_IDS_DIRECTORS;

export const isMemberOfDirector = (roleUid: string): boolean => {
  let result: boolean = false;

  if (roleUids) {
    const uids = roleUids.split(' ');

    result = uids.indexOf(roleUid) !== -1;
  }

  return result;
};