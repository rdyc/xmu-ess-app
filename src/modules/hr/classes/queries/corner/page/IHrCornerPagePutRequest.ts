import { IBaseCommand } from '@generic/interfaces';
import { IHrCornerPagePutPayload } from '@hr/classes/request';

export interface IHrCornerPagePutRequest extends IBaseCommand<IHrCornerPagePutPayload> {
  pageUid: string;
}