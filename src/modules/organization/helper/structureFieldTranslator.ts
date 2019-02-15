// import { ICollectionValue } from '@layout/classes/core';
// import { StructureField } from '@organization/classes/types/structure/StructureField';

// export const structureFieldTranslator = (find: string, field: ICollectionValue): string => {
//   let result: string = find;

//   if (field.name === StructureField.companyUid) {
//     switch (find.toLowerCase()) {
//       case 'equine':
//       case 'equine global':
//       case 'equine group':
//       case 'eqg':
//         result = 'CP001';
//         break;

//       case 'xsis':
//       case 'xsis mitra utama':
//       case 'xmu':
//         result = 'CP002';
//         break;

//       case 'optima':
//       case 'optima data':
//       case 'optima data international':
//       case 'odi':
//         result = 'CP003';
//         break;

//       case 'niagaprima':
//       case 'niagaprima paramitra':
//       case 'niaga prima':
//       case 'npp':
//         result = 'CP004';
//         break;

//       default:
//         break;
//     }
//   }

//   return result;
// };