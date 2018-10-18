import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
  IProjectRegistrationGetByIdRequest,
  IProjectRegistrationGetListRequest,
  IProjectRegistrationPostRequest,
  IProjectRegistrationPutRequest,
} from '@project/classes/queries/registration';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';
import {
  projectRegistrationGetAllDispose,
  projectRegistrationGetAllRequest,
  projectRegistrationGetByIdDispose,
  projectRegistrationGetByIdRequest,
  projectRegistrationGetListDispose,
  projectRegistrationGetListRequest,
  projectRegistrationPostDispose,
  projectRegistrationPostRequest,
  projectRegistrationPutDispose,
  projectRegistrationPutRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectRegisterState: {
    all: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>;
    list: IQueryCollectionState<IProjectRegistrationGetListRequest, IProjectList>;
    detail: IQuerySingleState<IProjectRegistrationGetByIdRequest, IProjectDetail>;
  };
}

interface PropsFromDispatch {
  projectRegisterDispatch: {
    // command
    createRequest: typeof projectRegistrationPostRequest;
    createDispose: typeof projectRegistrationPostDispose;
    updateRequest: typeof projectRegistrationPutRequest;
    updateDispose: typeof projectRegistrationPutDispose;

    // query
    loadAllRequest: typeof projectRegistrationGetAllRequest;
    loadAllDispose: typeof projectRegistrationGetAllDispose;
    loadListRequest: typeof projectRegistrationGetListRequest;
    loadListDispose: typeof projectRegistrationGetListDispose;
    loadDetailRequest: typeof projectRegistrationGetByIdRequest;
    loadDetailDispose: typeof projectRegistrationGetByIdDispose;
  };
}

export interface WithProjectRegistration extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectRegistrationGetAll, projectRegistrationGetList, projectRegistrationGetById }: IAppState) => ({
  projectRegisterState: {
    all: projectRegistrationGetAll,
    list: projectRegistrationGetList,
    detail: projectRegistrationGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectRegisterDispatch: {
    // command
    createRequest: (request: IProjectRegistrationPostRequest) => dispatch(projectRegistrationPostRequest(request)),
    createDispose: () => dispatch(projectRegistrationPostDispose()),
    updateRequest: (request: IProjectRegistrationPutRequest) => dispatch(projectRegistrationPutRequest(request)),
    updateDispose: () => dispatch(projectRegistrationPutDispose()),
    
    // query
    loadAllRequest: (request: IProjectRegistrationGetAllRequest) => dispatch(projectRegistrationGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectRegistrationGetAllDispose()),
    loadListRequest: (request: IProjectRegistrationGetListRequest) => dispatch(projectRegistrationGetListRequest(request)),
    loadListDispose: () => dispatch(projectRegistrationGetListDispose()),
    loadDetailRequest: (request: IProjectRegistrationGetByIdRequest) => dispatch(projectRegistrationGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(projectRegistrationGetByIdDispose()),
  }
});

export const withProjectRegistration = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);