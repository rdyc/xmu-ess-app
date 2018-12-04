import { IBaseCommand } from '@generic/interfaces';
import { ILookupDiemPostPayload } from '@lookup/classes/request/diem';

export interface ILookupDiemPostRequest extends IBaseCommand<ILookupDiemPostPayload> {
  companyUid: string;
}