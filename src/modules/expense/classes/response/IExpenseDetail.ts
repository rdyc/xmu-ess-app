import { ICommonSystem } from '@common/classes';
import { IExpenseClient } from '@expense/classes/response/IExpenseClient';
import { IBaseChanges } from '@generic/interfaces';
import { ICustomer } from '@lookup/classes/response';
import { IOrganizationWorkflow } from '@organization/interfaces';
import { IProject } from '@project/classes/response';

export interface IExpenseDetail {
  uid: string;
  customerUid: string;
  customer: ICustomer;
  projectUid: string;
  project: IProject;
  date?: string | null;
  expenseType: string;
  expense: ICommonSystem;
  value: number;
  location: string;
  address: string;
  client: IExpenseClient;
  notes?: string | null;
  statusType: string;
  status: ICommonSystem;
  rejectedReason?: string | null;
  isNotified?: boolean | null;
  histories?: History[] | null;
  workflow?: IOrganizationWorkflow | null;
  changes?: IBaseChanges | null;
}