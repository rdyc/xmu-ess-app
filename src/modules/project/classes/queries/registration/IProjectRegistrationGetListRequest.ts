import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';

export interface IProjectRegistrationGetListRequest {
  readonly filter: IProjectRegistrationGetListFilter | undefined;
}