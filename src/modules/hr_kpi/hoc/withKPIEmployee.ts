import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeeGetByYearRequest,
  IKPIEmployeePostRequest,
  IKPIEmployeePutRequest,
} from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response';
import {
  KPIEmployeeGetAllDispose,
  KPIEmployeeGetAllRequest,
  KPIEmployeeGetByIdDispose,
  KPIEmployeeGetByIdRequest,
  KPIEmployeeGetByYearDispose,
  KPIEmployeeGetByYearRequest,
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
    byYear: IQuerySingleState<IKPIEmployeeGetByYearRequest, IKPIEmployeeDetail>;
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
    loadByYearRequest: typeof KPIEmployeeGetByYearRequest;
    loadByYearDispose: typeof KPIEmployeeGetByYearDispose;
  };
}

export interface WithKPIEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiEmployeeGetAll, kpiEmployeeGetById, kpiEmployeeGetByYear }: IAppState) => ({
  kpiEmployeeState: {
    all: kpiEmployeeGetAll,
    detail: kpiEmployeeGetById,
    byYear: kpiEmployeeGetByYear
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
    loadByYearRequest: (request: IKPIEmployeeGetByYearRequest) => dispatch(KPIEmployeeGetByYearRequest(request)),
    loadByYearDispose: () => dispatch(KPIEmployeeGetByYearDispose()),
  }
});

export const withKPIEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);