import { IBaseCommand } from '@generic/interfaces';
import { IProjectRegistrationPatchPayload } from '@project/classes/request/registration';

export interface IProjectRegistrationPatchRequest extends IBaseCommand<IProjectRegistrationPatchPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}