import { IAccountEmployee } from '@account/classes';
import { ISummaryMappingProject } from './ISummaryMappingProject';
import { ISummaryMappingProjectGroup } from './ISummaryMappingProjectGroup';

export interface ISummaryMapping {
  employee: IAccountEmployee;
  projects?: ISummaryMappingProject[];
  projectGroups?: ISummaryMappingProjectGroup[];
}