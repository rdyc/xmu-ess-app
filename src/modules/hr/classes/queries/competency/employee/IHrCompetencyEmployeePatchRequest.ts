import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyEmployeePatchPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyEmployeePatchRequest extends IBaseCommand<IHrCompetencyEmployeePatchPayload> {
  competencyEmployeeUid: string;
}