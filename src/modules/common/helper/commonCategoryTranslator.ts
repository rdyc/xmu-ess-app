import { CommonCategoryType } from '@common/classes/types';

export const categoryTypeTranslator = (category: string): CommonCategoryType => {
  let result: CommonCategoryType = 'department';

  switch (category) {
    case 'employment':
      result = 'employment';
      break;

    case 'religion':
      result = 'religion';
      break;

    case 'family':
      result = 'family';
      break;

    case 'tax':
      result = 'tax';
      break;

    case 'unit':
      result = 'unit';
      break;

    case 'training':
      result = 'training';
      break;

    case 'certification':
      result = 'certification';
      break;

    case 'degree':
      result = 'degree';
      break;

    case 'blood':
      result = 'blood';
      break;

    case 'department':
      result = 'department';
      break;

    case 'site':
      result = 'site';
      break;

    default:
      break;
  }

  return result;
};