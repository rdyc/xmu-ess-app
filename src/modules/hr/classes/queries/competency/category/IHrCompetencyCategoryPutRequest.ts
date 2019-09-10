import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyCategoryPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyCategoryPutRequest extends IBaseCommand<IHrCompetencyCategoryPutPayload> {
  categoryUid: string;
  competencyUid: string;
}