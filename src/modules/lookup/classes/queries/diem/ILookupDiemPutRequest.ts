import { IBaseCommand } from '@generic/interfaces';
import { ILookupDiemPutPayload } from '@lookup/classes/request/diem';

export interface ILookupDiemPutRequest extends IBaseCommand<ILookupDiemPutPayload> {
  companyUid: string;
  diemUid: string;
}