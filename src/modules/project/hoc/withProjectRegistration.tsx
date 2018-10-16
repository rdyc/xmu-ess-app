import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IProjectGetAllRequest,
  IProjectGetByIdRequest,
  IProjectPostRequest,
  IProjectPutRequest,
} from '@project/classes/queries';
import { IProjectGetListRequest } from '@project/classes/queries/IProjectGetListRequest';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';
import {
  projectGetAllDispose,
  projectGetAllRequest,
  projectGetByIdDispose,
  projectGetByIdRequest,
  projectGetListDispose,
  projectGetListRequest,
  projectPostDispose,
  projectPostRequest,
  projectPutDispose,
  projectPutRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectRegisterState: {
    all: IQueryCollectionState<IProjectGetAllRequest, IProject>;
    list: IQueryCollectionState<IProjectGetListRequest, IProjectList>;
    detail: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
  };
}

interface PropsFromDispatch {
  projectRegisterDispatch: {
    // command
    createRequest: typeof projectPostRequest;
    createDispose: typeof projectPostDispose;
    updateRequest: typeof projectPutRequest;
    updateDispose: typeof projectPutDispose;

    // query
    loadAllRequest: typeof projectGetAllRequest;
    loadAllDispose: typeof projectGetAllDispose;
    loadListRequest: typeof projectGetListRequest;
    loadListDispose: typeof projectGetListDispose;
    loadDetailRequest: typeof projectGetByIdRequest;
    loadDetailDispose: typeof projectGetByIdDispose;
  };
}

export interface WithProjectRegistration extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectGetAll, projectGetList, projectGetById }: IAppState) => ({
  projectRegisterState: {
    all: projectGetAll,
    list: projectGetList,
    detail: projectGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectRegisterDispatch: {
    // command
    createRequest: (request: IProjectPostRequest) => dispatch(projectPostRequest(request)),
    createDispose: () => dispatch(projectPostDispose()),
    updateRequest: (request: IProjectPutRequest) => dispatch(projectPutRequest(request)),
    updateDispose: () => dispatch(projectPutDispose()),
    
    // query
    loadAllRequest: (request: IProjectGetAllRequest) => dispatch(projectGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectGetAllDispose()),
    loadListRequest: (request: IProjectGetListRequest) => dispatch(projectGetListRequest(request)),
    loadListDispose: () => dispatch(projectGetListDispose()),
    loadDetailRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(projectGetByIdDispose()),
  }
});

export const withProjectRegistration = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);