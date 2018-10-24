const roleUids = process.env.REACT_APP_ROLE_IDS_PMO;

export const roleOfPMO = (): string[] | [] => {
  let result: string[] = [];

  if (roleUids) {
    const uids = roleUids.split(' ');

    result = uids;
  }

  return result;
};