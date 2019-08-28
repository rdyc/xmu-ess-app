import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyAssessmentGetAllFilter extends IBasePagingFilter {
  status?: 'pending' | 'complete' | string;
}