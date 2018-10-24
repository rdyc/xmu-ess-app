const roleUids = process.env.REACT_APP_ROLE_IDS_PM;

export const roleOfPM = (): string[] | [] => {
  let result: string[] = [];

  if (roleUids) {
    const uids = roleUids.split(' ');

    result = uids;
  }

  return result;
};