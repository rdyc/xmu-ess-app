import { ICustomer } from '@lookup/classes/response';

export interface ISummaryWinningProject {
  projectUid: string;
  childProjectUid?: string | null;
  customerUid: string;
  customer?: ICustomer | null;
  name: string;
  date: string;
}