import { IBaseCommand } from '@generic/interfaces';
import { IProjectPutPayload } from '@project/classes/request';

export interface IProjectPutRequest extends IBaseCommand<IProjectPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}