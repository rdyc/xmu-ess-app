import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
  IProjectRegistrationGetByIdRequest,
  IProjectRegistrationPostRequest,
  IProjectRegistrationPutRequest,
} from '@project/classes/queries/registration';
import {
  IProjectRegistrationGetListRequest,
} from '@project/classes/queries/registration/IProjectRegistrationGetListRequest';
import { IProject, IProjectDetail, IProjectList, IProjectSite } from '@project/classes/response';

import { IProjectOwnerPutRequest } from '../queries/owner';
import {
  IProjectSiteDeleteRequest,
  IProjectSiteGetRequest,
  IProjectSitePostRequest,
  IProjectSitePutRequest,
} from '../queries/site';
import { IProjectStatusPutRequest } from '../queries/status';

export interface IProjectState {
  // registration
  projectRegistrationGetAll: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>;
  projectRegistrationGetList: IQueryCollectionState<IProjectRegistrationGetListRequest, IProjectList>;
  projectRegistrationGetById: IQuerySingleState<IProjectRegistrationGetByIdRequest, IProjectDetail>;
  projectRegistrationPost: IQuerySingleState<IProjectRegistrationPostRequest, IProject>;
  projectRegistrationPut: IQuerySingleState<IProjectRegistrationPutRequest, IProject>;

  // owner
  projectOwnerPut: IQuerySingleState<IProjectOwnerPutRequest, boolean>;

  // status
  projectStatusPut: IQuerySingleState<IProjectStatusPutRequest, boolean>;

  // site
  projectSiteGet: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>;
  projectSitePost: IQuerySingleState<IProjectSitePostRequest, boolean>;
  projectSitePut: IQuerySingleState<IProjectSitePutRequest, boolean>;
  projectSiteDelete: IQuerySingleState<IProjectSiteDeleteRequest, boolean>;

  // approval
  
  // assignment

  // acceptance
}