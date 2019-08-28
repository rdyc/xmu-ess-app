import { IBaseCommand } from '@generic/interfaces';
import { IHrCompetencyAssessmentPutPayload } from 'modules/hr/classes/request';

export interface IHrCompetencyAssessmentPutRequest extends IBaseCommand<IHrCompetencyAssessmentPutPayload> {
  assessmentUid: string;
}