import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyIndicatorPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyIndicatorPutRequest extends IBaseCommand<IHrCompetencyIndicatorPutPayload> {
  indicatorUid: string;
  levelUid: string;
  clusterUid: string;
  categoryUid: string;
}