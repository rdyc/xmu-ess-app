import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyLevelPostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyLevelPostRequest extends IBaseCommand<IHrCompetencyLevelPostPayload> {
  clusterUid: string;
  categoryUid: string;
}