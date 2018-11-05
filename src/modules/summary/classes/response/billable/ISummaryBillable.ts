import { IAccountEmployee } from '@account/classes';
import { ISummaryBillableCategory } from '@summary/classes/response/billable';

export interface ISummaryBillable {
  employee: IAccountEmployee;
  categories?: ISummaryBillableCategory[] | null;
}