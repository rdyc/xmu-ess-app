import { IFinanceGetAllFilter } from '@finance/classes/filters';
import { ICompanyAccess } from '@generic/interfaces';

export interface IFinanceGetAllRequest extends ICompanyAccess {
  readonly filter: IFinanceGetAllFilter | undefined;
}