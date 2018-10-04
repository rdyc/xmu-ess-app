import { IProjectPostPayload } from '@project/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface IProjectPostRequest extends IBaseCommand<IProjectPostPayload> {
  companyUid: string;
  positionUid: string;
}