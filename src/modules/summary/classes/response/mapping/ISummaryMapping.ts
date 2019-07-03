import { IAccountEmployee } from '@account/classes';
import { ISummaryMappingProject } from './ISummaryMappingProject';

export interface ISummaryMapping {
  employee: IAccountEmployee;
  projects?: ISummaryMappingProject[];
}