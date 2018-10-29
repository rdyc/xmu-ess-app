import { ISummaryBillableFilter } from '@summary/classes/filters';

export interface ISummaryBillableRequest {
  readonly filter: ISummaryBillableFilter | undefined;
  companyUid: string;
}