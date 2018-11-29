import { ICollectionValue } from '@layout/classes/core';

// DO NOT DELETE, CAN BE USEFUL FOR FUTURE (MAYBE?? IDK JUST DONT DELETE PLS)
// export type CommonCategory = 
//   'Activity Type' | 
//   'Blood Type' | 
//   'Certification Type' | 'Currency' | 
//   'Education Degree' | 'Department' | 'Travel Type' | 'Document' | 'Presales Document' | 
//   'Employement Status' | 'Expense Type' | 
//   'Family Status' | 'Finance Module' | 
//   'Gender' | 'Grade' | 'Project Hours' | 
//   'Business Unit' | 
//   'Leave Category' | 'Employee Level' | 'Time Limit' | 
//   'Finance Status' | 'Activity Travel' | 'Project Type' | 
//   'Relation' | 'Religion' | 
//   'Status' | 'Site Type' | 
//   'PTKP Status' | 'Training Type' | 'Transport Type';

const toObjectCategories = (categories: CommonCategory[]): ICollectionValue[] => {
  const objectCategories =  Object.keys(CommonCategory).map(key => ({ 
    value: key, 
    name: CommonCategory[key] 
  }));

  return objectCategories.filter(objectCategory =>
    categories.some(category =>
      category === objectCategory.name));
};

export const isWithCompany = (category: string): boolean => {
  const withCompany = [
    CommonCategory.unit, CommonCategory.employment,
    CommonCategory.tax, CommonCategory.blood, CommonCategory.religion,
    CommonCategory.degree, CommonCategory.family, CommonCategory.training,
    CommonCategory.certification, CommonCategory.site, 
  ];
  
  return toObjectCategories(withCompany).some(objectCategory => {
      return category === objectCategory.value;
  });
};

export const isWithParent = (category: string): boolean => {
  const withCompany = [
    CommonCategory.department
  ];
  
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

export enum CommonCategory {
  employment = 'Employement Status',
  religion = 'Religion',
  family = 'Family Status',
  tax = 'PTKP Status',
  unit = 'Business Unit',
  training = 'Training Type',
  certification = 'Certification Type',
  degree = 'Education Degree',
  blood = 'Blood Type',
  department = 'Department',
  site = 'Site Type',
}