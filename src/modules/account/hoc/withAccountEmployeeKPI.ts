import { 
  IEmployeeAllKPIAssignRequest, 
  IEmployeeAllKPIFinalRequest, 
  IEmployeeKPIFinalAllRequest, 
  IEmployeeKPIFinalByIdRequest 
} from '@account/classes/queries/employeeKPI';
import { 
  IEmployeeKPIAssign, 
  IEmployeeKPIFinal, 
  IKPIFinal 
} from '@account/classes/response/employeeKPI';
import {
  accountEmployeeGetAllKPIAssignDispose,
  accountEmployeeGetAllKPIAssignRequest,
  accountEmployeeGetAllKPIFinalDispose,
  accountEmployeeGetAllKPIFinalRequest,
  accountEmployeeKPIFinalGetAllDispose,
  accountEmployeeKPIFinalGetAllRequest,
  accountEmployeeKPIFinalGetByIdDispose,
  accountEmployeeKPIFinalGetByIdRequest,
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeKPIState: {
    allAssign: IQueryCollectionState<IEmployeeAllKPIAssignRequest, IEmployeeKPIAssign>;
    allFinal: IQueryCollectionState<IEmployeeAllKPIFinalRequest, IEmployeeKPIFinal>;
    all: IQueryCollectionState<IEmployeeKPIFinalAllRequest, IKPIFinal>;
    detail: IQuerySingleState<IEmployeeKPIFinalByIdRequest, IKPIFinal>;
  };
}

interface PropsFromDispatch {
  accountEmployeeKPIDispatch: {
    // query
    loadAllAssignRequest: typeof accountEmployeeGetAllKPIAssignRequest;
    loadAllAssignDispose: typeof accountEmployeeGetAllKPIAssignDispose;

    loadAllFinalRequest: typeof accountEmployeeGetAllKPIFinalRequest;
    loadAllFinalDispose: typeof accountEmployeeGetAllKPIFinalDispose;

    loadAllRequest: typeof accountEmployeeKPIFinalGetAllRequest;
    loadAllDispose: typeof accountEmployeeKPIFinalGetAllDispose;

    loadDetailRequest: typeof accountEmployeeKPIFinalGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeKPIFinalGetByIdDispose;
  };
}

export interface WithAccountEmployeeKPI extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeGetAllKPIAssign, accountEmployeeGetAllKPIFinal, accountEmployeeKPIFinalGetAll, accountEmployeeKPIFinalGetById }: IAppState) => ({
  accountEmployeeState: {
    allAssign: accountEmployeeGetAllKPIAssign,
    allFinal: accountEmployeeGetAllKPIFinal,
    all: accountEmployeeKPIFinalGetAll,
    detail: accountEmployeeKPIFinalGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeKPIDispatch: {
    // query
    loadAllAssignRequest: (request: IEmployeeAllKPIAssignRequest) => dispatch(accountEmployeeGetAllKPIAssignRequest(request)),
    loadAllAssignDispose: () => dispatch(accountEmployeeGetAllKPIAssignDispose()),

    loadAllFinalRequest: (request: IEmployeeAllKPIFinalRequest) => dispatch(accountEmployeeGetAllKPIFinalRequest(request)),
    loadAllFinalDispose: () => dispatch(accountEmployeeGetAllKPIFinalDispose()),

    loadAllRequest: (request: IEmployeeKPIFinalAllRequest) => dispatch(accountEmployeeKPIFinalGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeKPIFinalGetAllDispose()),

    loadDetailRequest: (request: IEmployeeKPIFinalByIdRequest) => dispatch(accountEmployeeKPIFinalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeKPIFinalGetByIdDispose())
  }
});

export const withAccountEmployeeKPI = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);