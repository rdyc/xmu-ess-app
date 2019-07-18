import { ISummaryMappingProject } from './ISummaryMappingProject';

export interface ISummaryMappingProjectGroup {
  start: string;
  end: string;
  totalProjects: number;
  totalMandays: number;
  totalActualMandays: number;
  projects?: ISummaryMappingProject[];
}