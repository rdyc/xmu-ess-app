import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import { 
  IKPIMeasurementDeleteRequest, 
  IKPIMeasurementGetAllRequest, 
  IKPIMeasurementGetByCategoryRequest, 
  IKPIMeasurementGetDetailRequest,
  IKPIMeasurementGetListRequest,   
  IKPIMeasurementPostRequest,
  IKPIMeasurementPutRequest
} from '@kpi/classes/queries/measurement';
import { IKPIMeasurement, IKPIMeasurementDetail, IKPIMeasurementList } from '@kpi/classes/response/measurement';
import { 
  KPIMeasurementDeleteDispose, 
  KPIMeasurementDeleteRequest, 
  KPIMeasurementGetAllDispose, 
  KPIMeasurementGetAllRequest, 
  KPIMeasurementGetByCategoryDispose, 
  KPIMeasurementGetByCategoryRequest,  
  KPIMeasurementGetByIdDispose, 
  KPIMeasurementGetByIdRequest, 
  KPIMeasurementGetListDispose,
  KPIMeasurementGetListRequest, 
  KPIMeasurementPostDispose,
  KPIMeasurementPostRequest,
  KPIMeasurementPutDispose,
  KPIMeasurementPutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiMeasurementState: {
    all: IQueryCollectionState<IKPIMeasurementGetAllRequest, IKPIMeasurement>;
    byCategory: IQueryCollectionState<IKPIMeasurementGetAllRequest, IKPIMeasurement>;
    list: IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList>;
    detail: IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail>;
  };
}

interface PropsFromDispatch {
  kpiMeasurementDispatch: {
    // command
    createRequest: typeof KPIMeasurementPostRequest;
    createDispose: typeof KPIMeasurementPostDispose;
    updateRequest: typeof KPIMeasurementPutRequest;
    updateDispose: typeof KPIMeasurementPutDispose;
    deleteRequest: typeof KPIMeasurementDeleteRequest;
    deleteDispose: typeof KPIMeasurementDeleteDispose;

    // query
    loadAllRequest: typeof KPIMeasurementGetAllRequest;
    loadAllDispose: typeof KPIMeasurementGetAllDispose;
    loadByCategoryRequest: typeof KPIMeasurementGetAllRequest;
    loadByCategoryDispose: typeof KPIMeasurementGetAllDispose;
    loadListRequest: typeof KPIMeasurementGetListRequest;
    loadListDispose: typeof KPIMeasurementGetListDispose;
    loadDetailRequest: typeof KPIMeasurementGetByIdRequest;
    loadDetailDispose: typeof KPIMeasurementGetByIdDispose;
  };
}

export interface WithKPIMeasurement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiMeasurementGetAll, kpiMeasurementGetByCategory, kpiMeasurementGetList, kpiMeasurementGetById }: IAppState) => ({
  kpiMeasurementState: {
    all: kpiMeasurementGetAll,
    byCategory: kpiMeasurementGetByCategory,
    list: kpiMeasurementGetList,
    detail: kpiMeasurementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiMeasurementDispatch: {
    // command
    createRequest: (request: IKPIMeasurementPostRequest) => dispatch(KPIMeasurementPostRequest(request)),
    createDispose: () => dispatch(KPIMeasurementPostDispose()),
    updateRequest: (request: IKPIMeasurementPutRequest) => dispatch(KPIMeasurementPutRequest(request)),
    updateDispose: () => dispatch(KPIMeasurementPutDispose()),
    deleteRequest: (request: IKPIMeasurementDeleteRequest) => dispatch(KPIMeasurementDeleteRequest(request)),
    deleteDispose: () => dispatch(KPIMeasurementDeleteDispose()),
    
    // query
    loadAllRequest: (request: IKPIMeasurementGetAllRequest) => dispatch(KPIMeasurementGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIMeasurementGetAllDispose()),
    loadByCategoryRequest: (request: IKPIMeasurementGetByCategoryRequest) => dispatch(KPIMeasurementGetByCategoryRequest(request)),
    loadByCategoryDispose: () => dispatch(KPIMeasurementGetByCategoryDispose()),
    loadListRequest: (request: IKPIMeasurementGetListRequest) => dispatch(KPIMeasurementGetListRequest(request)),
    loadListDispose: () => dispatch(KPIMeasurementGetListDispose()),
    loadDetailRequest: (request: IKPIMeasurementGetDetailRequest) => dispatch(KPIMeasurementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIMeasurementGetByIdDispose()),
  }
});

export const withKPIMeasurement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);