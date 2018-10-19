const roleUids = process.env.REACT_APP_ROLE_IDS_SALES;

export const isMemberOfSales = (roleUid: string): boolean => {
  let result: boolean = false;

  if (roleUids) {
    const uids = roleUids.split(' ');

    result = uids.indexOf(roleUid) !== -1;
  }

  return result;
};