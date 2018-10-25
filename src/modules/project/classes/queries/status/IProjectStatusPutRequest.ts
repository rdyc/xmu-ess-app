import { IBaseCommand } from '@generic/interfaces';
import { IProjectStatusPutPayload } from '@project/classes/request/status';

export interface IProjectStatusPutRequest extends IBaseCommand<IProjectStatusPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}