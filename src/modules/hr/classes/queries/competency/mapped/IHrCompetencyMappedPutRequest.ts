import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyMappedPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyMappedPutRequest extends IBaseCommand<IHrCompetencyMappedPutPayload> {
  mappedUid: string;
}