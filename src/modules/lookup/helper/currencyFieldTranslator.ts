import { ICollectionValue } from '@layout/classes/core';
import { CurrencyField } from '@lookup/classes/types';

export const currencyFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  if (field.name === CurrencyField.isActive) {
    switch (find.toLowerCase()) {

      case 'active':
      case 'actived':
        result = 'true';
        break;

      case 'non active':
      case 'non actived':
        result = 'true';
        break;

      default:
      break;
  }
}
  return result;
};