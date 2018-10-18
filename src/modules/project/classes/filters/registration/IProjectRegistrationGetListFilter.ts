import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';

export interface IProjectRegistrationGetListFilter extends IProjectRegistrationGetAllFilter {
  activeOnly: boolean | null;
  assignmentStatus: 'assigned' | 'unassigned' | null;
}