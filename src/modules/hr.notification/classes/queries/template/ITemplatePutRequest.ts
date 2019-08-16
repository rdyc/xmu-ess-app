import { IBaseCommand } from '@generic/interfaces';
import { ITemplatePutPayload } from '@hr.notification/classes/request/template';

export interface ITemplatePutRequest extends IBaseCommand<ITemplatePutPayload> {
  templateUid: string;
}