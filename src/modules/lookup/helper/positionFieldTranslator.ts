import { ICollectionValue } from '@layout/classes/core';
import { PositionField } from '@lookup/classes/types';

export const positionFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  if (field.name === PositionField.isExpired) {
    switch (find.toLowerCase()) {

      case 'expire':
      case 'expired':
      case 'not active':
      case 'not actived':
      case 'inactive':
      case 'inactived':
        result = 'true';
        break;

      case 'active':
      case 'actived':
      case 'aktif':
      case '':
        result = 'false';
        break;

      default:
      break;
  }
}
  return result;
};