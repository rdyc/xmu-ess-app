import { CommonField } from '@common/classes/types/CommonField';
import { ICollectionValue } from '@layout/classes/core';

export const commonFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace status type
  if (field.name === CommonField.isActive) {
    switch (find.toLowerCase()) {
      case 'yes':
      case 'true':
      case 'active':
        result = '1';
        break;
      
      case 'no':
      case 'false':
      case 'inactive':
      case 'notactive':
      case 'not active':
        result = '';
        break;

      default:
        break;
    }
  }

  return result;
};