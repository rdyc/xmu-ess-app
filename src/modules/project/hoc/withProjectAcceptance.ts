import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectAcceptanceGetAllRequest,
  IProjectAcceptanceGetByIdRequest,
  IProjectAcceptancePostRequest,
} from '@project/classes/queries/acceptance';
import { IProjectAssignmentDetail, IProjectAssignmentDetailItem } from '@project/classes/response';
import {
  projectAcceptanceGetAllDispose,
  projectAcceptanceGetAllRequest,
  projectAcceptanceGetByIdDispose,
  projectAcceptanceGetByIdRequest,
  projectAcceptancePostDispose,
  projectAcceptancePostRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectAcceptanceState: {
    all: IQueryCollectionState<IProjectAcceptanceGetAllRequest, IProjectAssignmentDetail>;
    detail: IQuerySingleState<IProjectAcceptanceGetByIdRequest, IProjectAssignmentDetailItem>;
  };
}

interface PropsFromDispatch {
  projectAcceptanceDispatch: {
    // command
    createRequest: typeof projectAcceptancePostRequest;
    createDispose: typeof projectAcceptancePostDispose;

    // query
    loadAllRequest: typeof projectAcceptanceGetAllRequest;
    loadAllDispose: typeof projectAcceptanceGetAllDispose;
    loadDetailRequest: typeof projectAcceptanceGetByIdRequest;
    loadDetailDispose: typeof projectAcceptanceGetByIdDispose;
  };
}

export interface WithProjectAcceptance extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectAcceptanceGetAll, projectAcceptanceGetById }: IAppState) => ({
  projectAcceptanceState: {
    all: projectAcceptanceGetAll,
    detail: projectAcceptanceGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectAcceptanceDispatch: {
    // command
    createRequest: (request: IProjectAcceptancePostRequest) => dispatch(projectAcceptancePostRequest(request)),
    createDispose: () => dispatch(projectAcceptancePostDispose()),
    
    // query
    loadAllRequest: (request: IProjectAcceptanceGetAllRequest) => dispatch(projectAcceptanceGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectAcceptanceGetAllDispose()),
    loadDetailRequest: (request: IProjectAcceptanceGetByIdRequest) => dispatch(projectAcceptanceGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(projectAcceptanceGetByIdDispose()),
  }
});

export const withProjectAcceptance = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);