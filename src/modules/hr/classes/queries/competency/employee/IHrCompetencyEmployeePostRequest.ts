import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyEmployeePostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyEmployeePostRequest extends IBaseCommand<IHrCompetencyEmployeePostPayload> {
  employeeUid: string;
  positionUid: string;
}