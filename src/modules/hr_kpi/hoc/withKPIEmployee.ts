import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeeGetLatestRequest,
  IKPIEmployeePostRequest,
  IKPIEmployeePutRequest,
} from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response';
import {
  KPIEmployeeGetAllDispose,
  KPIEmployeeGetAllRequest,
  KPIEmployeeGetByIdDispose,
  KPIEmployeeGetByIdRequest,
  KPIEmployeeGetLatestDispose,
  KPIEmployeeGetLatestRequest,
  KPIEmployeePostDispose,
  KPIEmployeePostRequest,
  KPIEmployeePutDispose,
  KPIEmployeePutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiEmployeeState: {
    all: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
    detail: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
    latest: IQuerySingleState<IKPIEmployeeGetLatestRequest, IKPIEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  kpiEmployeeDispatch: {
    // command
    createRequest: typeof KPIEmployeePostRequest;
    createDispose: typeof KPIEmployeePostDispose;
    updateRequest: typeof KPIEmployeePutRequest;
    updateDispose: typeof KPIEmployeePutDispose;

    // query
    loadAllRequest: typeof KPIEmployeeGetAllRequest;
    loadAllDispose: typeof KPIEmployeeGetAllDispose;
    loadDetailRequest: typeof KPIEmployeeGetByIdRequest;
    loadDetailDispose: typeof KPIEmployeeGetByIdDispose;
    loadLatestRequest: typeof KPIEmployeeGetLatestRequest;
    loadLatestDispose: typeof KPIEmployeeGetLatestDispose;
  };
}

export interface WithKPIEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiEmployeeGetAll, kpiEmployeeGetById, kpiEmployeeGetLatest }: IAppState) => ({
  kpiEmployeeState: {
    all: kpiEmployeeGetAll,
    detail: kpiEmployeeGetById,
    latest: kpiEmployeeGetLatest
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiEmployeeDispatch: {
    // command
    createRequest: (request: IKPIEmployeePostRequest) => dispatch(KPIEmployeePostRequest(request)),
    createDispose: () => dispatch(KPIEmployeePostDispose()),
    updateRequest: (request: IKPIEmployeePutRequest) => dispatch(KPIEmployeePutRequest(request)),
    updateDispose: () => dispatch(KPIEmployeePutDispose()),
    
    // query
    loadAllRequest: (request: IKPIEmployeeGetAllRequest) => dispatch(KPIEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIEmployeeGetAllDispose()),
    loadDetailRequest: (request: IKPIEmployeeGetByIdRequest) => dispatch(KPIEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIEmployeeGetByIdDispose()),
    loadLatestRequest: (request: IKPIEmployeeGetLatestRequest) => dispatch(KPIEmployeeGetLatestRequest(request)),
    loadLatestDispose: () => dispatch(KPIEmployeeGetLatestDispose()),
  }
});

export const withKPIEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);