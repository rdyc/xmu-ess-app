import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeDeleteRequest, IEmployeeListRequest, IEmployeePostRequest, IEmployeePutRequest } from '@account/classes/queries';
import { IEmployee, IEmployeeDetail } from '@account/classes/response';
import {
  accountEmployeeDeleteDispose,
  accountEmployeeDeleteRequest,
  accountEmployeeGetAllDispose,
  accountEmployeeGetAllRequest,
  accountEmployeeGetByIdDispose,
  accountEmployeeGetByIdRequest,
  accountEmployeeGetListDispose,
  accountEmployeeGetListRequest,
  accountEmployeePostDispose,
  accountEmployeePostRequest,
  accountEmployeePutDispose,
  accountEmployeePutRequest,
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeState: {
    all: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
    list: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
    detail: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeDispatch: {
    // command
    createRequest: typeof accountEmployeePostRequest;
    createDispose: typeof accountEmployeePostDispose;

    updateRequest: typeof accountEmployeePutRequest;
    updateDispose: typeof accountEmployeePutDispose;

    deleteRequest: typeof accountEmployeeDeleteRequest;
    deleteDispose: typeof accountEmployeeDeleteDispose;

    // query
    loadAllRequest: typeof accountEmployeeGetAllRequest;
    loadAllDispose: typeof accountEmployeeGetAllDispose;
    
    loadListRequest: typeof accountEmployeeGetListRequest;
    loadListDispose: typeof accountEmployeeGetListDispose;

    loadDetailRequest: typeof accountEmployeeGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeGetByIdDispose;
  };
}

export interface WithAccountEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeGetAll, accountEmployeeGetList, accountEmployeeGetById }: IAppState) => ({
  accountEmployeeState: {
    all: accountEmployeeGetAll,
    list: accountEmployeeGetList,
    detail: accountEmployeeGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeDispatch: {
    // command
    createRequest: (request: IEmployeePostRequest) => dispatch(accountEmployeePostRequest(request)),
    createDispose: () => dispatch(accountEmployeePostDispose()),

    updateRequest: (request: IEmployeePutRequest) => dispatch(accountEmployeePutRequest(request)),
    updateDispose: () => dispatch(accountEmployeePutDispose()),

    deleteRequest: (request: IEmployeeDeleteRequest) => dispatch(accountEmployeeDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeAllRequest) => dispatch(accountEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeGetAllDispose()),

    loadListRequest: (request: IEmployeeListRequest) => dispatch(accountEmployeeGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeGetListDispose()),

    loadDetailRequest: (request: IEmployeeByIdRequest) => dispatch(accountEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeGetByIdDispose())
  }
});

export const withAccountEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);