import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IOrganizationWorkflowAllRequest, 
  IOrganizationWorkflowByIdRequest, 
  IOrganizationWorkflowDeleteRequest, 
  IOrganizationWorkflowListRequest, 
  IOrganizationWorkflowMenuRequest, 
  IOrganizationWorkflowPostRequest, 
  IOrganizationWorkflowPutRequest
} from '@organization/classes/queries/workflow';
import { IWorkflow, IWorkflowList } from '@organization/classes/response/workflow';
import { IWorkflowMenu } from '@organization/classes/response/workflow/IWorkflowMenu';
import {
  organizationWorkflowDeleteDispose,
  organizationWorkflowDeleteRequest,
  organizationWorkflowGetAllDispose,
  organizationWorkflowGetAllRequest,
  organizationWorkflowGetByIdDispose,
  organizationWorkflowGetByIdRequest,
  organizationWorkflowGetByMenuDispose,
  organizationWorkflowGetByMenuRequest,
  organizationWorkflowGetListDispose,
  organizationWorkflowGetListRequest,
  organizationWorkflowPostDispose,
  organizationWorkflowPostRequest,
  organizationWorkflowPutDispose,
  organizationWorkflowPutRequest,
} from '@organization/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  organizationWorkflowState: {
    all: IQueryCollectionState<IOrganizationWorkflowAllRequest, IWorkflow>;
    list: IQueryCollectionState<IOrganizationWorkflowListRequest, IWorkflowList>;
    detail: IQuerySingleState<IOrganizationWorkflowByIdRequest, IWorkflow>;
    certain: IQuerySingleState<IOrganizationWorkflowMenuRequest, IWorkflowMenu>;
  };
}

interface PropsFromDispatch {
  organizationWorkflowDispatch: {
    // command
    createRequest: typeof organizationWorkflowPostRequest;
    createDispose: typeof organizationWorkflowPostDispose;
    updateRequest: typeof organizationWorkflowPutRequest;
    updateDispose: typeof organizationWorkflowPutDispose;
    deleteRequest: typeof organizationWorkflowDeleteRequest;
    deleteDispose: typeof organizationWorkflowDeleteDispose;

    // query
    loadAllRequest: typeof organizationWorkflowGetAllRequest;
    loadAllDispose: typeof organizationWorkflowGetAllDispose;
    loadListRequest: typeof organizationWorkflowGetListRequest;
    loadListDispose: typeof organizationWorkflowGetListDispose;
    loadDetailRequest: typeof organizationWorkflowGetByIdRequest;
    loadDetailDispose: typeof organizationWorkflowGetByIdDispose;
    loadCertainRequest: typeof organizationWorkflowGetByMenuRequest;
    loadCertainDispose: typeof organizationWorkflowGetByMenuDispose;
  };
}

export interface WithOrganizationWorkflow extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ organizationWorkflowGetAll, organizationWorkflowGetList, organizationWorkflowGetById, organizationWorkflowGetByMenu }: IAppState) => ({
  organizationWorkflowState: {
    all: organizationWorkflowGetAll,
    list: organizationWorkflowGetList,
    detail: organizationWorkflowGetById,
    certain: organizationWorkflowGetByMenu,    
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  organizationWorkflowDispatch: {
    // command
    createRequest: (request: IOrganizationWorkflowPostRequest) => dispatch(organizationWorkflowPostRequest(request)),
    createDispose: () => dispatch(organizationWorkflowPostDispose()),
    updateRequest: (request: IOrganizationWorkflowPutRequest) => dispatch(organizationWorkflowPutRequest(request)),
    updateDispose: () => dispatch(organizationWorkflowPutDispose()),
    deleteRequest: (request: IOrganizationWorkflowDeleteRequest) => dispatch(organizationWorkflowDeleteRequest(request)),
    deleteDispose: () => dispatch(organizationWorkflowDeleteDispose()),
    
    // query
    loadAllRequest: (request: IOrganizationWorkflowAllRequest) => dispatch(organizationWorkflowGetAllRequest(request)),
    loadAllDispose: () => dispatch(organizationWorkflowGetAllDispose()),
    loadListRequest: (request: IOrganizationWorkflowListRequest) => dispatch(organizationWorkflowGetListRequest(request)),
    loadListDispose: () => dispatch(organizationWorkflowGetListDispose()),
    loadDetailRequest: (request: IOrganizationWorkflowByIdRequest) => dispatch(organizationWorkflowGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(organizationWorkflowGetByIdDispose()),
    loadCertainRequest: (request: IOrganizationWorkflowMenuRequest) => dispatch(organizationWorkflowGetByMenuRequest(request)),
    loadCertainDispose: () => dispatch(organizationWorkflowGetByMenuDispose()),
  }
});

export const withOrganizationWorkflow = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);