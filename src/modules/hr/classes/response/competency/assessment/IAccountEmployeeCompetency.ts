import { IEmployeeDetail } from '@account/classes/response';
import { ICompetencyAssess } from './ICompetencyAssess';

export interface IAccountEmployeeCompetency extends IEmployeeDetail {
  competencyAssess?: ICompetencyAssess;
}