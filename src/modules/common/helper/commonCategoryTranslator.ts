import { CommonCategoryType } from '@common/classes/types';

export const categoryTypeTranslator = (category: string): CommonCategoryType => {
  let result: CommonCategoryType = 'department';

  switch (category) {
    case 'employment': result = 'employment'; break;
    case 'religion': result = 'religion'; break;
    case 'family': result = 'family'; break;
    case 'tax': result = 'tax'; break;
    case 'unit': result = 'unit'; break;
    case 'training': result = 'training'; break;
    case 'certification': result = 'certification'; break;
    case 'degree': result = 'degree'; break;
    case 'blood': result = 'blood'; break;
    case 'department': result = 'department'; break;
    case 'site': result = 'site'; break;
    case 'activity': result = 'activity'; break;
    case 'currency': result = 'currency'; break;
    case 'destination': result = 'destination'; break;
    case 'document': result = 'document'; break;
    case 'documentPreSales': result = 'documentPreSales'; break;
    case 'expense': result = 'expense'; break;
    case 'finance': result = 'finance'; break;
    case 'gender': result = 'gender'; break;
    case 'grade': result = 'grade'; break;
    case 'hours': result = 'hours'; break;
    case 'leave': result = 'leave'; break;
    case 'level': result = 'level'; break;
    case 'limiter': result = 'limiter'; break;
    case 'payment': result = 'payment'; break;
    case 'purpose': result = 'purpose'; break;
    case 'project': result = 'project'; break;
    case 'relation': result = 'relation'; break;
    case 'status': result = 'status'; break;
    case 'transportation': result = 'transportation'; break;

    default:  break;
  }

  return result;
};

export const parentTypeTranslator = (category: string): string => {
  let result = '';

  switch (category) {
    case 'department': result = 'unit'; break;

    default : break;
  }

  return result;
};