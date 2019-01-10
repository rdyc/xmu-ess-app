import { ISummaryBillableFilter } from '@summary/classes/filters';

export interface ISummaryGetBillableRequest {
  readonly filter: ISummaryBillableFilter | undefined;
  companyUid?: string;
}