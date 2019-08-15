
import { IHrCompetencyIndicatorList } from '@hr/classes/response/competency/indicator/IHrCompetencyIndicatorList';

export interface ICategoryLevelItemPayload {
  uid?: string;
  level: number;
  description: string;
  indicators: IHrCompetencyIndicatorList[];
}