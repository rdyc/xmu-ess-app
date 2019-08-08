import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyClusterPatchPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyClusterPatchRequest extends IBaseCommand<IHrCompetencyClusterPatchPayload> {
  clusterUid: string;
}