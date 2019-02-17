// import { ICollectionValue } from '@layout/classes/core';
// import { PositionField } from '@lookup/classes/types';

// export const positionFieldTranslator = (find: string, field: ICollectionValue): string => {
//   let result: string = find;

//   if (field.name === PositionField.isAllowMultiple) {
//     switch (find.toLowerCase()) {

//       case 'allow':
//       case 'allowed':
//       case 'active':
//       case 'actived':
//       case 'open':
//       case 'opened':
//         result = 'true';
//         break;

//       case 'inactive':
//       case 'inactived':
//       case 'not allow':
//       case 'not allowed':
//       case 'disallow':
//       case 'disallowed':
//       case 'close':
//       case 'closed':
//         result = 'false';
//         break;

//       default:
//       break;
//   }
// }
//   return result;
// };