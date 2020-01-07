import { 
  IEmployeeAllKPIFinalRequest, 
  IEmployeeKPIFinalAllRequest, 
  IEmployeeKPIFinalByIdRequest 
} from '@account/classes/queries/employeeKPIFinal';
import { 
  IEmployeeKPIFinal, 
  IKPIFinal 
} from '@account/classes/response/employeeKPIFinal';
import {
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
  accountEmployeeKPIFinalState: {
    allFinal: IQueryCollectionState<IEmployeeAllKPIFinalRequest, IEmployeeKPIFinal>;
    all: IQueryCollectionState<IEmployeeKPIFinalAllRequest, IKPIFinal>;
    detail: IQuerySingleState<IEmployeeKPIFinalByIdRequest, IKPIFinal>;
  };
}

interface PropsFromDispatch {
  accountEmployeeKPIFinalDispatch: {
    // query
    loadAllFinalRequest: typeof accountEmployeeGetAllKPIFinalRequest;
    loadAllFinalDispose: typeof accountEmployeeGetAllKPIFinalDispose;

    loadAllRequest: typeof accountEmployeeKPIFinalGetAllRequest;
    loadAllDispose: typeof accountEmployeeKPIFinalGetAllDispose;

    loadDetailRequest: typeof accountEmployeeKPIFinalGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeKPIFinalGetByIdDispose;
  };
}

export interface WithAccountEmployeeKPIFinal extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeGetAllKPIFinal, accountEmployeeKPIFinalGetAll, accountEmployeeKPIFinalGetById }: IAppState) => ({
  accountEmployeeKPIFinalState: {
    allFinal: accountEmployeeGetAllKPIFinal,
    all: accountEmployeeKPIFinalGetAll,
    detail: accountEmployeeKPIFinalGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeKPIFinalDispatch: {
    // query
    loadAllFinalRequest: (request: IEmployeeAllKPIFinalRequest) => dispatch(accountEmployeeGetAllKPIFinalRequest(request)),
    loadAllFinalDispose: () => dispatch(accountEmployeeGetAllKPIFinalDispose()),

    loadAllRequest: (request: IEmployeeKPIFinalAllRequest) => dispatch(accountEmployeeKPIFinalGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeKPIFinalGetAllDispose()),

    loadDetailRequest: (request: IEmployeeKPIFinalByIdRequest) => dispatch(accountEmployeeKPIFinalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeKPIFinalGetByIdDispose())
  }
});

export const withAccountEmployeeKPIFinal = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);