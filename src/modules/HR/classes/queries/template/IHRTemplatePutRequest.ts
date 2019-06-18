import { IBaseCommand } from '@generic/interfaces';
import { IHRTemplatePutPayload } from '@hr/classes/request';

export interface IHRTemplatePutRequest extends IBaseCommand<IHRTemplatePutPayload> {
  templateUid: string;
}