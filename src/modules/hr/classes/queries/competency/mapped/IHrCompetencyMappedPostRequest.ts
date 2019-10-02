import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyMappedPostPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyMappedPostRequest extends IBaseCommand<IHrCompetencyMappedPostPayload> {
  positionUid: string;
}