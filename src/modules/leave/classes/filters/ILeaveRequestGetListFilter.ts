import { ILeaveRequestGetAllFilter } from '@leave/classes/filters';

export interface ILeaveRequestGetListFilter extends ILeaveRequestGetAllFilter {
  activeOnly: boolean | null;
}