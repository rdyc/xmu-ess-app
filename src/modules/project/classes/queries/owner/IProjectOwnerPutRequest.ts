import { IBaseCommand } from '@generic/interfaces';
import { IProjectOwnerPutPayload } from '@project/classes/request/owner';

export interface IProjectOwnerPutRequest extends IBaseCommand<IProjectOwnerPutPayload> {
  companyUid: string;
  positionUid: string;
  projectUid: string;
}