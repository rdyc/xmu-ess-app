import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectAssignmentGetAllRequest,
  IProjectAssignmentGetByIdRequest,
  IProjectAssignmentGetListRequest,
  IProjectAssignmentPatchRequest,
} from '@project/classes/queries/assignment';
import { IProjectAssignment, IProjectAssignmentDetail, IProjectAssignmentList } from '@project/classes/response';
import {
  projectAssignmentGetAllDispose,
  projectAssignmentGetAllRequest,
  projectAssignmentGetByIdDispose,
  projectAssignmentGetByIdRequest,
  projectAssignmentGetListDispose,
  projectAssignmentGetListRequest,
  projectAssignmentPatchDispose,
  projectAssignmentPatchRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectAssignmentState: {
    all: IQueryCollectionState<IProjectAssignmentGetAllRequest, IProjectAssignment>;
    list: IQueryCollectionState<IProjectAssignmentGetListRequest, IProjectAssignmentList>;
    detail: IQuerySingleState<IProjectAssignmentGetByIdRequest, IProjectAssignmentDetail>;
  };
}

interface PropsFromDispatch {
  projectAssignmentDispatch: {
    // command
    patchRequest: typeof projectAssignmentPatchRequest;
    patchDispose: typeof projectAssignmentPatchDispose;

    // query
    loadAllRequest: typeof projectAssignmentGetAllRequest;
    loadAllDispose: typeof projectAssignmentGetAllDispose;
    loadListRequest: typeof projectAssignmentGetListRequest;
    loadListDispose: typeof projectAssignmentGetListDispose;
    loadDetailRequest: typeof projectAssignmentGetByIdRequest;
    loadDetailDispose: typeof projectAssignmentGetByIdDispose;
  };
}

export interface WithProjectAssignment extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectAssignmentGetAll, projectAssignmentGetList, projectAssignmentGetById }: IAppState) => ({
  projectAssignmentState: {
    all: projectAssignmentGetAll,
    list: projectAssignmentGetList,
    detail: projectAssignmentGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectAssignmentDispatch: {
    // command
    patchRequest: (request: IProjectAssignmentPatchRequest) => dispatch(projectAssignmentPatchRequest(request)),
    patchDispose: () => dispatch(projectAssignmentPatchDispose()),
    
    // query
    loadAllRequest: (request: IProjectAssignmentGetAllRequest) => dispatch(projectAssignmentGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectAssignmentGetAllDispose()),
    loadListRequest: (request: IProjectAssignmentGetListRequest) => dispatch(projectAssignmentGetListRequest(request)),
    loadListDispose: () => dispatch(projectAssignmentGetListDispose()),
    loadDetailRequest: (request: IProjectAssignmentGetByIdRequest) => dispatch(projectAssignmentGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(projectAssignmentGetByIdDispose()),
  }
});

export const withProjectAssignment = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);