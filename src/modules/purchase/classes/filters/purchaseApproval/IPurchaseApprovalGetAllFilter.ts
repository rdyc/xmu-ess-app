import { ICompanyAccess } from '@generic/interfaces';

export interface IPurchaseApprovalGetAllFilter extends ICompanyAccess {
  isNotify?: boolean | undefined;
  status?: 'pending' | 'complete' | undefined;
  readonly customerUid?: string | undefined;
  readonly 'query.find'?: string | undefined;
  readonly 'query.findBy'?: string | undefined;
  readonly 'query.orderBy'?: string | undefined;
  readonly 'query.direction'?: string | undefined;
  readonly 'query.page': number | undefined;
  readonly 'query.size': number | undefined;
}