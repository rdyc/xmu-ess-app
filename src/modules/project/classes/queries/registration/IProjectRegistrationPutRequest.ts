import { IBaseCommand } from '@generic/interfaces';
import { IProjectRegistrationPutPayload } from '@project/classes/request/registration';

export interface IProjectRegistrationPutRequest extends IBaseCommand<IProjectRegistrationPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}