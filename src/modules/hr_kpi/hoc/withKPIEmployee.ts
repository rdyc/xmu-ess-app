import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeePostBulkRequest,
  IKPIEmployeePutAchievedRequest,
  IKPIEmployeePutRequest,
} from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response';
import {
  KPIEmployeeGetAllDispose,
  KPIEmployeeGetAllRequest,
  KPIEmployeeGetByIdDispose,
  KPIEmployeeGetByIdRequest,
  KPIEmployeePostBulkDispose,
  KPIEmployeePostBulkRequest,
  KPIEmployeePutAchievedDispose,
  KPIEmployeePutAchievedRequest,
  KPIEmployeePutDispose,
  KPIEmployeePutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiEmployeeState: {
    all: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
    detail: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  kpiEmployeeDispatch: {
    // command
    createBulkRequest: typeof KPIEmployeePostBulkRequest;
    createBulkDispose: typeof KPIEmployeePostBulkDispose;
    updateRequest: typeof KPIEmployeePutRequest;
    updateDispose: typeof KPIEmployeePutDispose;
    updateAchievedRequest: typeof KPIEmployeePutAchievedRequest;
    updateAchievedDispose: typeof KPIEmployeePutAchievedDispose;

    // query
    loadAllRequest: typeof KPIEmployeeGetAllRequest;
    loadAllDispose: typeof KPIEmployeeGetAllDispose;
    loadDetailRequest: typeof KPIEmployeeGetByIdRequest;
    loadDetailDispose: typeof KPIEmployeeGetByIdDispose;
  };
}

export interface WithKPIEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiEmployeeGetAll, kpiEmployeeGetById }: IAppState) => ({
  kpiEmployeeState: {
    all: kpiEmployeeGetAll,
    detail: kpiEmployeeGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiEmployeeDispatch: {
    // command
    createBulkRequest: (request: IKPIEmployeePostBulkRequest) => dispatch(KPIEmployeePostBulkRequest(request)),
    createBulkDispose: () => dispatch(KPIEmployeePostBulkDispose()),
    updateRequest: (request: IKPIEmployeePutRequest) => dispatch(KPIEmployeePutRequest(request)),
    updateDispose: () => dispatch(KPIEmployeePutDispose()),
    updateAchievedRequest: (request: IKPIEmployeePutAchievedRequest) => dispatch(KPIEmployeePutAchievedRequest(request)),
    updateAchievedDispose: () => dispatch(KPIEmployeePutAchievedDispose()),
    
    // query
    loadAllRequest: (request: IKPIEmployeeGetAllRequest) => dispatch(KPIEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIEmployeeGetAllDispose()),
    loadDetailRequest: (request: IKPIEmployeeGetByIdRequest) => dispatch(KPIEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIEmployeeGetByIdDispose()),
  }
});

export const withKPIEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);