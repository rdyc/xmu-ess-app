import { IBaseCommand } from '@generic/interfaces';
import { ICalculateLeavePayload } from '@lookup/classes/request';

export interface ICalculateLeavePostRequest extends IBaseCommand<ICalculateLeavePayload> {
  companyUid: string;
  year: number;
}