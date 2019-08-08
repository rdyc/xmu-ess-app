import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyLevelPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyLevelPutRequest extends IBaseCommand<IHrCompetencyLevelPutPayload> {
  levelUid: string;
  clusterUid: string;
  categoryUid: string;
}