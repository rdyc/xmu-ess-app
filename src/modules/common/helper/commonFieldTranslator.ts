import { CommonCategory } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';

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
    CommonCategory.certification, 
    // CommonCategory.site
  ];

  if ((category === undefined || category === null) || (category === '')) {
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

  if ((category === undefined || category === null) || (category === '')) {
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
    CommonCategory.certification, CommonCategory.site, CommonCategory.competency,
    CommonCategory.profession,
    //  CommonCategory.assessor
  ];

  return toObjectCategories(categories);
};