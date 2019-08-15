import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyIndicatorPostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyIndicatorPostRequest extends IBaseCommand<IHrCompetencyIndicatorPostPayload> {
  levelUid: string;
  clusterUid: string;
  categoryUid: string;
}