// import { WorkflowStatusType } from '@common/classes/types';
// import { ICollectionValue } from '@layout/classes/core';
// import { MileageRequestField } from '@mileage/classes/types';

// export const mileageRequestFieldTranslator = (find: string, field: ICollectionValue): string => {
//   let result: string = find;

//   //  replace type
//   if (field.name === MileageRequestField.statusType) { 
//     switch (find.toLowerCase()) {
//       case 'submit':
//       case 'submitted':
//         result = WorkflowStatusType.Submitted;
//         break;
      
//       case 'in progress':
//       case 'on progress':
//       case 'progress':
//         result = WorkflowStatusType.InProgress;
//         break;

//       case 'approve':
//       case 'approved':
//         result = WorkflowStatusType.Approved;
//         break;

//       case 'reject':
//       case 'rejected':
//         result = WorkflowStatusType.Rejected;
//         break;

//       default:
//         break;
//     }
//   }

//   // replace month
//   if (field.name === MileageRequestField.month) {
//     switch (find.toLowerCase()) {
//       case 'jan':
//       case 'january':
//       case 'januari':
//         result = '1';
//         break;

//       case 'feb':
//       case 'february':
//       case 'februari':
//         result = '2';
//         break;

//       case 'mar':
//       case 'march':
//       case 'maret':
//         result = '3';
//         break;

//       case 'apr':
//       case 'april':
//         result = '4';
//         break;

//       case 'may':
//       case 'mei':
//         result = '5';
//         break;

//       case 'jun':
//       case 'juny':
//       case 'juni':
//         result = '6';
//         break;

//       case 'jul':
//       case 'july':
//       case 'juli':
//         result = '7';
//         break;

//       case 'aug':
//       case 'agu':
//       case 'august':
//       case 'agustus':
//         result = '8';
//         break;

//       case 'sep':
//       case 'september':
//         result = '9';
//         break;

//       case 'oct':
//       case 'okt':
//       case 'october':
//       case 'oktober':
//         result = '10';
//         break;

//       case 'nov':
//       case 'november':
//         result = '11';
//         break;

//       case 'dec':
//       case 'des':
//       case 'december':
//       case 'desember':
//         result = '12';
//         break;
        
//       default:
//         break;
//     }
//   }

//   return result;
// };