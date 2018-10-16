import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectGetAllRequest,
  IProjectGetByIdRequest,
  IProjectPostRequest,
  IProjectPutRequest,
} from '@project/classes/queries';
import { IProjectGetListRequest } from '@project/classes/queries/IProjectGetListRequest';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';

export interface IProjectState {
  projectGetAll: IQueryCollectionState<IProjectGetAllRequest, IProject>;
  projectGetList: IQueryCollectionState<IProjectGetListRequest, IProjectList>;
  projectGetById: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
  projectPost: IQuerySingleState<IProjectPostRequest, IProject>;
  projectPut: IQuerySingleState<IProjectPutRequest, IProject>;
}