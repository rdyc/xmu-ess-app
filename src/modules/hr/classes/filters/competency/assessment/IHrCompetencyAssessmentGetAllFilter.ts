import { IBasePagingFilter } from '@generic/interfaces';

export interface IHrCompetencyAssessmentGetAllFilter extends IBasePagingFilter {
  // status?: 'pending' | 'complete' | string;
  assessmentYear?: number;
  companyUid?: string;
  positionUid?: string;
}