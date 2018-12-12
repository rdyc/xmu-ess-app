// import { ICollectionValue } from '@layout/classes/core';
// import { MileageExceptionField } from '@lookup/classes/types';
// import { CompanyStatusType } from '@lookup/classes/types/company';

// export const mileageExceptionFieldTranslator = (find: string, field: ICollectionValue): string => {
//   let result: string = find;

//   // replace company
//   if (field.name === MileageExceptionField.roleUid) {
//     switch (find.toLowerCase()) {
//       case 'eg':
//       case 'equine':
//       case 'equine global':
//         result = CompanyStatusType.EquineGlobal;
//         break;

//       case 'xmu':
//       case 'xsis':
//       case 'xsis mitra utama':
//         result = CompanyStatusType.XsisMitraUtama;
//         break;

//       case 'odi':
//       case 'optima':
//       case 'optima data international':
//         result = CompanyStatusType.OptimaDataInternational;
//         break;

//       case 'npp':
//       case 'niagaprima':
//       case 'niagaprima paraitra':
//         result = CompanyStatusType.NiagaprimaParamitra;
//         break;

//       default:
//         break;
//     }
//   }

//   return result;
// };