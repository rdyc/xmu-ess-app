import { IEmployeeAllRequest, IEmployeeByIdRequest, IEmployeeListRequest } from '@account/classes/queries';
import { IEmployee, IEmployeeDetail } from '@account/classes/response';
import {
  accountEmployeeGetAllDispose,
  accountEmployeeGetAllRequest,
  accountEmployeeGetByIdDispose,
  accountEmployeeGetByIdRequest,
  accountEmployeeGetListDispose,
  accountEmployeeGetListRequest,
} from '@account/store/actions';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeState: {
    all: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
    list: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
    detail: IQueryCollectionState<IEmployeeByIdRequest, IEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeDispatch: {
    // list
    
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

    // query
    loadAllRequest: (request: IEmployeeAllRequest) => dispatch(accountEmployeeGetAllRequest(request)),
    loadListRequest: (request: IEmployeeListRequest) => dispatch(accountEmployeeGetListRequest(request)),
    loadDetailRequest: (request: IEmployeeByIdRequest) => dispatch(accountEmployeeGetByIdRequest(request)),
  }
});

export const withAccountEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);