import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyClusterPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyClusterPutRequest extends IBaseCommand<IHrCompetencyClusterPutPayload> {
  competencyUid: string;
}