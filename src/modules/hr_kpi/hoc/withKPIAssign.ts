import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIAssignGetAllRequest,
  IKPIAssignGetByIdRequest,
  IKPIAssignPostBulkRequest,
  IKPIAssignPutRequest,
} from '@kpi/classes/queries';
import { IKPIAssign, IKPIAssignDetail } from '@kpi/classes/response';
import {
  KPIAssignGetAllDispose,
  KPIAssignGetAllRequest,
  KPIAssignGetByIdDispose,
  KPIAssignGetByIdRequest,
  KPIAssignPostBulkDispose,
  KPIAssignPostBulkRequest,
  KPIAssignPutDispose,
  KPIAssignPutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiAssignState: {
    all: IQueryCollectionState<IKPIAssignGetAllRequest, IKPIAssign>;
    detail: IQuerySingleState<IKPIAssignGetByIdRequest, IKPIAssignDetail>;
  };
}

interface PropsFromDispatch {
  kpiAssignDispatch: {
    // command
    createBulkRequest: typeof KPIAssignPostBulkRequest;
    createBulkDispose: typeof KPIAssignPostBulkDispose;
    updateRequest: typeof KPIAssignPutRequest;
    updateDispose: typeof KPIAssignPutDispose;

    // query
    loadAllRequest: typeof KPIAssignGetAllRequest;
    loadAllDispose: typeof KPIAssignGetAllDispose;
    loadDetailRequest: typeof KPIAssignGetByIdRequest;
    loadDetailDispose: typeof KPIAssignGetByIdDispose;
  };
}

export interface WithKPIAssign extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiAssignGetAll, kpiAssignGetById }: IAppState) => ({
  kpiAssignState: {
    all: kpiAssignGetAll,
    detail: kpiAssignGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiAssignDispatch: {
    // command
    createBulkRequest: (request: IKPIAssignPostBulkRequest) => dispatch(KPIAssignPostBulkRequest(request)),
    createBulkDispose: () => dispatch(KPIAssignPostBulkDispose()),
    updateRequest: (request: IKPIAssignPutRequest) => dispatch(KPIAssignPutRequest(request)),
    updateDispose: () => dispatch(KPIAssignPutDispose()),
    
    // query
    loadAllRequest: (request: IKPIAssignGetAllRequest) => dispatch(KPIAssignGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIAssignGetAllDispose()),
    loadDetailRequest: (request: IKPIAssignGetByIdRequest) => dispatch(KPIAssignGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIAssignGetByIdDispose()),
  }
});

export const withKPIAssign = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);