import { IBaseCommand } from '@generic/interfaces';
import { IKPIOpenPutPayload } from '../../request/open';

export interface IKPIOpenPutRequest extends IBaseCommand<IKPIOpenPutPayload> {
  openUid: string;
}