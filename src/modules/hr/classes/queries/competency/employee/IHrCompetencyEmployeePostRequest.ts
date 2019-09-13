import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyEmployeePostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyEmployeePostRequest extends IBaseCommand<IHrCompetencyEmployeePostPayload> {
  respondenUid: string;
  positionUid: string;
}