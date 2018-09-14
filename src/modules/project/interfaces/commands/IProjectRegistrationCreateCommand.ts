import { IProjectUpdatePayload } from '@project/interfaces/payloads';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectRegistrationCreateCommand extends IBaseCommand<IProjectUpdatePayload> {
  companyUid: string;
  positionUid: string;
}