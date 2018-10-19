import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
  IProjectRegistrationGetByIdRequest,
  IProjectRegistrationPostRequest,
  IProjectRegistrationPutRequest,
} from '@project/classes/queries/registration';
import { IProjectRegistrationGetListRequest } from '@project/classes/queries/registration/IProjectRegistrationGetListRequest';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';

export interface IProjectState {
  // registration
  projectRegistrationGetAll: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>;
  projectRegistrationGetList: IQueryCollectionState<IProjectRegistrationGetListRequest, IProjectList>;
  projectRegistrationGetById: IQuerySingleState<IProjectRegistrationGetByIdRequest, IProjectDetail>;
  projectRegistrationPost: IQuerySingleState<IProjectRegistrationPostRequest, IProject>;
  projectRegistrationPut: IQuerySingleState<IProjectRegistrationPutRequest, IProject>;

  // approval

  // change owner

  // site management

  // assignment

  // acceptance
}