import { IProjectGetAllFilter } from '@project/classes/filters';

export interface IProjectRegistrationListFilter<T> extends IProjectGetAllFilter {
  activeOnly: boolean | null;
  assignmentStatus: 'assigned' | 'unassigned' | null;
  filter: T | null;
}