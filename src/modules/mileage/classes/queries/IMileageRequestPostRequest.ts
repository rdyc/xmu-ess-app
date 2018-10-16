import { IBaseCommand } from '@generic/interfaces';
import { IMileageRequestPostPayload } from '@mileage/classes/request';

export interface IMileageRequestPostRequest extends IBaseCommand<IMileageRequestPostPayload> {
  companyUid: string;
  positionUid: string;
}
