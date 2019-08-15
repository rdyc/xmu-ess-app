import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyCategoryPatchPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyCategoryPatchRequest extends IBaseCommand<IHrCompetencyCategoryPatchPayload> {
  categoryUid: string;
  clusterUid: string;
}