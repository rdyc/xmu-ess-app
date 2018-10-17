import { ICompanyAccess } from '@generic/interfaces';
import { ISettlementGetAllFilter } from '@purchase/classes/filters/purchaseSettlement';

export interface ISettlementGetAllRequest extends ICompanyAccess {
  readonly filter: ISettlementGetAllFilter | undefined;
  isRejected: boolean | undefined;
}