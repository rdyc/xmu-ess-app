import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';

export interface IProjectRegistrationGetListFilter extends IProjectRegistrationGetAllFilter {
  activeOnly?: boolean | undefined;
  assignmentStatus?: 'assigned' | 'unassigned' | undefined;
}