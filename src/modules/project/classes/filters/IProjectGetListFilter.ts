import { IProjectGetAllFilter } from '@project/classes/filters';

export interface IProjectGetListFilter extends IProjectGetAllFilter {
  activeOnly: boolean | null;
  assignmentStatus: 'assigned' | 'unassigned' | null;
}