import { IBaseCommand } from '@generic/interfaces';
import { IMileageApprovalPostPayload } from '@mileage/classes/request';

export interface IMileageApprovalPostRequest extends IBaseCommand<IMileageApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  mileageUid: string;
}
