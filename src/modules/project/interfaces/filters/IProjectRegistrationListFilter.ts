import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';

export interface IProjectRegistrationListFilter<T> extends IProjectRegistrationAllFilter {
  activeOnly: boolean | null;
  assignmentStatus: 'assigned' | 'unassigned' | null;
  filter: T | null;
}