import {  
  IEmployeeAllKPIAssignRequest, 
  IEmployeeKPIAssignAllRequest, 
  IEmployeeKPIAssignByIdRequest
} from '@account/classes/queries/employeeKPIAssign';
import { 
  IEmployeeKPIAssign, IKPIAssign 
} from '@account/classes/response/employeeKPIAssign';
import {
  accountEmployeeGetAllKPIAssignDispose,
  accountEmployeeGetAllKPIAssignRequest,
  accountEmployeeKPIAssignGetAllDispose,
  accountEmployeeKPIAssignGetAllRequest,
  accountEmployeeKPIAssignGetByIdDispose,
  accountEmployeeKPIAssignGetByIdRequest,
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeKPIAssignState: {
    allAssign: IQueryCollectionState<IEmployeeAllKPIAssignRequest, IEmployeeKPIAssign>;
    all: IQueryCollectionState<IEmployeeKPIAssignAllRequest, IKPIAssign>;
    detail: IQuerySingleState<IEmployeeKPIAssignByIdRequest, IKPIAssign>;
  };
}

interface PropsFromDispatch {
  accountEmployeeKPIAssignDispatch: {
    // query
    loadAllAssignRequest: typeof accountEmployeeGetAllKPIAssignRequest;
    loadAllAssignDispose: typeof accountEmployeeGetAllKPIAssignDispose;

    loadAllRequest: typeof accountEmployeeKPIAssignGetAllRequest;
    loadAllDispose: typeof accountEmployeeKPIAssignGetAllDispose;

    loadDetailRequest: typeof accountEmployeeKPIAssignGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeKPIAssignGetByIdDispose;
  };
}

export interface WithAccountEmployeeKPIAssign extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeGetAllKPIAssign, accountEmployeeKPIAssignGetAll, accountEmployeeKPIAssignGetById }: IAppState) => ({
  accountEmployeeKPIAssignState: {
    allAssign: accountEmployeeGetAllKPIAssign,
    all: accountEmployeeKPIAssignGetAll,
    detail: accountEmployeeKPIAssignGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeKPIAssignDispatch: {
    // query
    loadAllAssignRequest: (request: IEmployeeAllKPIAssignRequest) => dispatch(accountEmployeeGetAllKPIAssignRequest(request)),
    loadAllAssignDispose: () => dispatch(accountEmployeeGetAllKPIAssignDispose()),

    loadAllRequest: (request: IEmployeeKPIAssignAllRequest) => dispatch(accountEmployeeKPIAssignGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeKPIAssignGetAllDispose()),

    loadDetailRequest: (request: IEmployeeKPIAssignByIdRequest) => dispatch(accountEmployeeKPIAssignGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeKPIAssignGetByIdDispose())
  }
});

export const withAccountEmployeeKPIAssign = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);