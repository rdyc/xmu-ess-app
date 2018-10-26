import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectApprovalGetAllRequest,
  IProjectApprovalGetByIdRequest,
  IProjectApprovalPostRequest,
} from '@project/classes/queries/approval';
import { IProject, IProjectDetail } from '@project/classes/response';
import {
  projectApprovalGetAllDispose,
  projectApprovalGetAllRequest,
  projectApprovalGetByIdDispose,
  projectApprovalGetByIdRequest,
  projectApprovalPostDispose,
  projectApprovalPostRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectApprovalState: {
    all: IQueryCollectionState<IProjectApprovalGetAllRequest, IProject>;
    detail: IQuerySingleState<IProjectApprovalGetByIdRequest, IProjectDetail>;
  };
}

interface PropsFromDispatch {
  projectApprovalDispatch: {
    // command
    createRequest: typeof projectApprovalPostRequest;
    createDispose: typeof projectApprovalPostDispose;

    // query
    loadAllRequest: typeof projectApprovalGetAllRequest;
    loadAllDispose: typeof projectApprovalGetAllDispose;
    loadDetailRequest: typeof projectApprovalGetByIdRequest;
    loadDetailDispose: typeof projectApprovalGetByIdDispose;
  };
}

export interface WithProjectApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectApprovalGetAll, projectApprovalGetById }: IAppState) => ({
  projectApprovalState: {
    all: projectApprovalGetAll,
    detail: projectApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectApprovalDispatch: {
    // command
    createRequest: (request: IProjectApprovalPostRequest) => dispatch(projectApprovalPostRequest(request)),
    createDispose: () => dispatch(projectApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: IProjectApprovalGetAllRequest) => dispatch(projectApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectApprovalGetAllDispose()),
    loadDetailRequest: (request: IProjectApprovalGetByIdRequest) => dispatch(projectApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(projectApprovalGetByIdDispose()),
  }
});

export const withProjectApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);