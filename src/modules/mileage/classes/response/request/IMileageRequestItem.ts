import { ICommonSystem } from '@common/classes';
import { ILookupCustomer } from '@lookup/classes';
import { IProject, IProjectSite } from '@project/classes/response';

export interface IMileageRequestItem {
  uid: string;
  date: string;
  customerUid: string;
  customer: ILookupCustomer | null;
  projectUid: string;
  project: IProject | null;
  siteUid: string;
  site: IProjectSite | null;
  amount: string;
  statusType: string;
  status: ICommonSystem | null;
}
