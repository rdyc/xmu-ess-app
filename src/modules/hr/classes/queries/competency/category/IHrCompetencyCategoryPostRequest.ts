import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyCategoryPostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyCategoryPostRequest extends IBaseCommand<IHrCompetencyCategoryPostPayload> {
  clusterUid: string;
}