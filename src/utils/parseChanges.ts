import { IBaseChanges } from '@generic/interfaces';

export const parseChanges = (changes: IBaseChanges | null) => {
  let result = 'Unknown';
  
  if (!changes) {
    return result;
  }

  if (changes.updatedBy !== null) {
    result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
  } else {
    result = changes.created ? changes.created.fullName : changes.createdBy;
  }

  return result;
};