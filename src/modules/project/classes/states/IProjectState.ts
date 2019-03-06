import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
  IProjectRegistrationGetByIdRequest,
  IProjectRegistrationGetListRequest,
  IProjectRegistrationPostRequest,
  IProjectRegistrationPutRequest,
} from '@project/classes/queries/registration';
import {
  IProject,
  IProjectAssignment,
  IProjectAssignmentDetail,
  IProjectAssignmentDetailItem,
  IProjectAssignmentList,
  IProjectDetail,
  IProjectList,
  IProjectSite,
} from '@project/classes/response';

import {
  IProjectAcceptanceGetAllRequest,
  IProjectAcceptanceGetByIdRequest,
  IProjectAcceptancePostRequest,
} from '../queries/acceptance';
import {
  IProjectApprovalGetAllRequest,
  IProjectApprovalGetByIdRequest,
  IProjectApprovalPostRequest,
} from '../queries/approval';
import {
  IProjectAssignmentGetAllRequest,
  IProjectAssignmentGetByIdRequest,
  IProjectAssignmentGetListRequest,
  IProjectAssignmentPatchRequest,
} from '../queries/assignment';
import { IProjectHourPutRequest } from '../queries/hour';
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

  // hour
  projectHourPut: IQuerySingleState<IProjectHourPutRequest, boolean>;

  // status
  projectStatusPut: IQuerySingleState<IProjectStatusPutRequest, boolean>;

  // site
  projectSiteGet: IQueryCollectionState<IProjectSiteGetRequest, IProjectSite>;
  projectSitePost: IQuerySingleState<IProjectSitePostRequest, boolean>;
  projectSitePut: IQuerySingleState<IProjectSitePutRequest, boolean>;
  projectSiteDelete: IQuerySingleState<IProjectSiteDeleteRequest, boolean>;

  // approval
  projectApprovalGetAll: IQueryCollectionState<IProjectApprovalGetAllRequest, IProject>;
  projectApprovalGetById: IQuerySingleState<IProjectApprovalGetByIdRequest, IProjectDetail>;
  projectApprovalPost: IQuerySingleState<IProjectApprovalPostRequest, boolean>;

  // assignment
  projectAssignmentGetAll: IQueryCollectionState<IProjectAssignmentGetAllRequest, IProjectAssignment>;
  projectAssignmentGetList: IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList>;
  projectAssignmentGetById: IQuerySingleState<IProjectAssignmentGetByIdRequest, IProjectAssignmentDetail>;
  projectAssignmentPatch: IQuerySingleState<IProjectAssignmentPatchRequest, undefined>;

  // acceptance
  projectAcceptanceGetAll: IQueryCollectionState<IProjectAcceptanceGetAllRequest, IProjectAssignment>;
  projectAcceptanceGetById: IQuerySingleState<IProjectAcceptanceGetByIdRequest, IProjectAssignmentDetailItem>;
  projectAcceptancePost: IQuerySingleState<IProjectAcceptancePostRequest, boolean>;

  // administration
  projectAdministrationGetAll: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>;
}