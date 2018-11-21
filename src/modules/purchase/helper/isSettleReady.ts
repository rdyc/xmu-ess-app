export const isSettleReady = (statusType: string | null | undefined): boolean => {
  let result = false;

  result = statusType === null;

  return result;
};