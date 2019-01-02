// import { LimiterStatusType } from '@common/classes/types';
// import { ICollectionValue } from '@layout/classes/core';
// import { SystemLimitField } from '@lookup/classes/types';
// import { CompanyStatusType } from '@lookup/classes/types/company';

// export const systemLimitFieldTranslator = (find: string, field: ICollectionValue): string => {
//   let result: string = find;

//   // replace company
//   if (field.name === SystemLimitField.companyUid) {
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

//   // replace category
//   if (field.name === SystemLimitField.categoryType) {
//     switch (find.toLowerCase()) {
//       case 'time':
//       case 'time report':
//       case 'time report entry':
//         result = LimiterStatusType.TimeReportEntry;
//         break;

//       case 'rfpa':
//         result = LimiterStatusType.Rfpa;
//         break;

//       case 'expense':
//         result = LimiterStatusType.Expense;
//         break;

//       case 'rfpa settlement':
//         result = LimiterStatusType.RfpaSettlement;
//         break;

//       case 'travel':
//       case 'travel settlement':
//         result = LimiterStatusType.TravelSettlement;
//         break;
      
//       default:
//         break;
//     }
//   }

//   return result;
// };