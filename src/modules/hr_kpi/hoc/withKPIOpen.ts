import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {  
  IKPIOpenGetAllRequest, 
  IKPIOpenGetDetailRequest,
  IKPIOpenPostRequest,
  IKPIOpenPutRequest
} from '@kpi/classes/queries/open';
import { IKPIOpen, IKPIOpenDetail } from '@kpi/classes/response/open';
import {  
  KPIOpenGetAllDispose, 
  KPIOpenGetAllRequest,  
  KPIOpenGetByIdDispose, 
  KPIOpenGetByIdRequest, 
  KPIOpenPostDispose,
  KPIOpenPostRequest,
  KPIOpenPutDispose,
  KPIOpenPutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiOpenState: {
    all: IQueryCollectionState<IKPIOpenGetAllRequest, IKPIOpen>;
    detail: IQuerySingleState<IKPIOpenGetDetailRequest, IKPIOpenDetail>;
  };
}

interface PropsFromDispatch {
  kpiOpenDispatch: {
    // command
    createRequest: typeof KPIOpenPostRequest;
    createDispose: typeof KPIOpenPostDispose;
    updateRequest: typeof KPIOpenPutRequest;
    updateDispose: typeof KPIOpenPutDispose;

    // query
    loadAllRequest: typeof KPIOpenGetAllRequest;
    loadAllDispose: typeof KPIOpenGetAllDispose;
    loadDetailRequest: typeof KPIOpenGetByIdRequest;
    loadDetailDispose: typeof KPIOpenGetByIdDispose;
  };
}

export interface WithKPIOpen extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiOpenGetAll, kpiOpenGetById }: IAppState) => ({
  kpiOpenState: {
    all: kpiOpenGetAll,
    detail: kpiOpenGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiOpenDispatch: {
    // command
    createRequest: (request: IKPIOpenPostRequest) => dispatch(KPIOpenPostRequest(request)),
    createDispose: () => dispatch(KPIOpenPostDispose()),
    updateRequest: (request: IKPIOpenPutRequest) => dispatch(KPIOpenPutRequest(request)),
    updateDispose: () => dispatch(KPIOpenPutDispose()),
    
    // query
    loadAllRequest: (request: IKPIOpenGetAllRequest) => dispatch(KPIOpenGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIOpenGetAllDispose()),
    loadDetailRequest: (request: IKPIOpenGetDetailRequest) => dispatch(KPIOpenGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIOpenGetByIdDispose()),
  }
});

export const withKPIOpen = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);