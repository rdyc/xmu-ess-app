import { IBasePagingFilter } from '@generic/interfaces';

// tslint:disable-next-line:no-empty-interface
export interface IPositionGetAllFilter extends IBasePagingFilter {
  companyUid?: string | undefined; 
}