import { IBaseCommand } from '@generic/interfaces';
import { IProjectHourPutPayload } from '@project/classes/request/hour';

export interface IProjectHourPutRequest extends IBaseCommand<IProjectHourPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}