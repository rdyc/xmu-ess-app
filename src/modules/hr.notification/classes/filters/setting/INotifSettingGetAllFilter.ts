import { IBasePagingFilter } from '@generic/interfaces';

export interface INotifSettingGetAllFilter extends IBasePagingFilter {
  companyUid?: string;
}