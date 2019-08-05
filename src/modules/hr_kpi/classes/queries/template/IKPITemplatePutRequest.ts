import { IBaseCommand } from '@generic/interfaces';
import { IKPITemplatePutPayload } from '@kpi/classes/request';

export interface IKPITemplatePutRequest extends IBaseCommand<IKPITemplatePutPayload> {
  positionUid: string;
  companyUid: string;
  templateUid: string;
}