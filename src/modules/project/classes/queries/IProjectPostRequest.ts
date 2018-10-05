import { IBaseCommand } from '@generic/interfaces';
import { IProjectPostPayload } from '@project/classes/request';

export interface IProjectPostRequest extends IBaseCommand<IProjectPostPayload> {
  companyUid: string;
  positionUid: string;
}