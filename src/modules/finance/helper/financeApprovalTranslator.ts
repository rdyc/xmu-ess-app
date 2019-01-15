import { ModuleType } from '@common/classes/types';
import { FinanceField } from '@finance/classes/types';
import { ICollectionValue } from '@layout/classes/core';

export const financeApprovalFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace payment type
  // if (field.name === FinanceField.statusType) {
  //   switch (find.toLowerCase()) {
  //     case 'paid':
  //       result = FinanceStatusType.Paid;
  //       break;
      
  //     case 'not paid':
  //     case 'notpaid':
  //       result = FinanceStatusType.NotPaid;
  //       break;
      
  //     case 'hold':
  //       result = FinanceStatusType.Hold;
  //       break;

  //     case 'approve':
  //     case 'approved':
  //       result = FinanceStatusType.Approved;
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // replace module type
  if (field.name === FinanceField.moduleUid) {
    switch (find.toLowerCase()) {
      case 'expense':
        result = ModuleType.Expense;
        break;

      case 'mileage':
        result = ModuleType.Mileage;
        break;

      case 'travel':
        result = ModuleType.Travel;
        break;

      case 'travel settlement':
      case 'travelsettlement':
        result = ModuleType.TravelSettlement;
        break;

      case 'purchase':
      case 'rfpa':
        result = ModuleType.Purchase;
        break;

      case 'purchase settlement':
      case 'purchasesettlement':
      case 'rfpa settlement':
      case 'rfpasettlement':
        result = ModuleType.PurchaseSettlement;
        break;

      default:
        break;
    }
  }

  return result;
};