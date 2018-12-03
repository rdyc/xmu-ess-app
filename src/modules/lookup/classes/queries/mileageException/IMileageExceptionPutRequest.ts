import { IBaseCommand } from '@generic/interfaces';
import { IMileageExceptionPutPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPutPayload';

export interface IMileageExceptionPutRequest extends IBaseCommand<IMileageExceptionPutPayload> {
  mileageExceptionUid: string;
}
