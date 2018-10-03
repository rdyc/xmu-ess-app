import { IProjectPutPayload } from '@project/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectPutRequest extends IBaseCommand<IProjectPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}