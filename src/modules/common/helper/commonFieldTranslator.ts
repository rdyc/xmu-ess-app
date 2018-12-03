import { CommonCategory } from '@common/classes/types';
import { CommonField } from '@common/classes/types/CommonField';
import { ICollectionValue } from '@layout/classes/core';
import { isNullOrUndefined } from 'util';

export const commonFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace status type
  // if (field.name === CommonField.isActive) {
  //   switch (find.toLowerCase()) {
  //     case 'yes':
  //     case 'true':
  //     case 'active':
  //       result = 'true';
  //       break;
      
  //     case 'no':
  //     case 'false':
  //     case 'inactive':
  //     case 'notactive':
  //     case 'not active':
  //       result = 'false';
  //       break;

  //     default:
  //       break;
  //   }
  // }

  if (field.name === CommonField.companyUid) {
    switch (find.toLowerCase()) {
      case 'equine':
      case 'equine global':
      case 'equine group':
      case 'eqg':
        result = 'CP001';
        break;

      case 'xsis':
      case 'xsis mitra utama':
      case 'xmu':
        result = 'CP002';
        break;
      
      case 'optima':
      case 'optima data':
      case 'optima data international':
      case 'odi':
        result = 'CP003';
        break;
      
      case 'niagaprima':
      case 'niagaprima paramitra':
      case 'niaga prima':
      case 'npp':
        result = 'CP004';
        break;

      default:
        break;
    }
  }

  return result;
};

const toObjectCategories = (categories: CommonCategory[]): ICollectionValue[] => {
  const objectCategories =  Object.keys(CommonCategory).map(key => ({ 
    value: key, 
    name: CommonCategory[key] 
  }));

  return objectCategories.filter(objectCategory =>
    categories.some(category =>
      category === objectCategory.name));
};

export const isWithCompany = (category?: string): boolean => {
  const withCompany = [
    CommonCategory.unit, CommonCategory.employment, CommonCategory.department,
    CommonCategory.tax, CommonCategory.blood, CommonCategory.religion,
    CommonCategory.degree, CommonCategory.family, CommonCategory.training,
    CommonCategory.certification, CommonCategory.site, 
  ];

  if (isNullOrUndefined(category) || (category === '')) {
    return true;
  }
  
  return toObjectCategories(withCompany).some(objectCategory => {
      return category === objectCategory.value;
  });
};

export const isWithParent = (category?: string): boolean => {
  const withCompany = [
    CommonCategory.department
  ];

  if (isNullOrUndefined(category) || (category === '')) {
    return true;
  }
  
  return toObjectCategories(withCompany).some(objectCategory => {
      return category === objectCategory.value;
  });
};

export const editableCategories = (): ICollectionValue[] => {
  const categories = [
    CommonCategory.unit, CommonCategory.department, CommonCategory.employment,
    CommonCategory.tax, CommonCategory.blood, CommonCategory.religion,
    CommonCategory.degree, CommonCategory.family, CommonCategory.training,
    CommonCategory.certification, CommonCategory.site,
  ];

  return toObjectCategories(categories);
};