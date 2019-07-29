import { IBaseCommand } from '@generic/interfaces';
import { IKPITemplatePutPayload } from '@KPI/classes/request';

export interface IKPITemplatePutRequest extends IBaseCommand<IKPITemplatePutPayload> {
  templateUid: string;
}