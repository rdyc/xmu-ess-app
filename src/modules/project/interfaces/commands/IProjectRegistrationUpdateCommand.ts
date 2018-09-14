import { IProjectUpdatePayload } from '@project/interfaces/payloads';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectRegistrationUpdateCommand extends IBaseCommand<IProjectUpdatePayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}