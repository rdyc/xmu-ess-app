import { IBaseCommand } from '@generic/interfaces';
import { IProjectRegistrationPostPayload } from '@project/classes/request/registration';

export interface IProjectRegistrationPostRequest extends IBaseCommand<IProjectRegistrationPostPayload> {
  companyUid: string;
  positionUid: string;
}