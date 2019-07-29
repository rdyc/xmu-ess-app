import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import { 
  IKPIMeasurementDeleteRequest, 
  IKPIMeasurementGetAllRequest, 
  IKPIMeasurementGetDetailRequest, 
  IKPIMeasurementGetListRequest,
  IKPIMeasurementPostRequest,   
  IKPIMeasurementPutRequest
} from '@KPI/classes/queries/measurement';
import { IKPIMeasurement, IKPIMeasurementDetail, IKPIMeasurementList } from '@KPI/classes/response/measurement';
import { 
  KPIMeasurementDeleteDispose, 
  KPIMeasurementDeleteRequest, 
  KPIMeasurementGetAllDispose, 
  KPIMeasurementGetAllRequest, 
  KPIMeasurementGetByIdDispose, 
  KPIMeasurementGetByIdRequest,  
  KPIMeasurementGetListDispose, 
  KPIMeasurementGetListRequest, 
  KPIMeasurementPostDispose,
  KPIMeasurementPostRequest, 
  KPIMeasurementPutDispose,
  KPIMeasurementPutRequest
} from '@KPI/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  KPIMeasurementState: {
    all: IQueryCollectionState<IKPIMeasurementGetAllRequest, IKPIMeasurement>;
    list: IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList>;
    detail: IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail>;
  };
}

interface PropsFromDispatch {
  KPIMeasurementDispatch: {
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
    loadListRequest: typeof KPIMeasurementGetListRequest;
    loadListDispose: typeof KPIMeasurementGetListDispose;
    loadDetailRequest: typeof KPIMeasurementGetByIdRequest;
    loadDetailDispose: typeof KPIMeasurementGetByIdDispose;
  };
}

export interface WithKPIMeasurement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ KPIMeasurementGetAll, KPIMeasurementGetList, KPIMeasurementGetById }: IAppState) => ({
  KPIMeasurementState: {
    all: KPIMeasurementGetAll,
    list: KPIMeasurementGetList,
    detail: KPIMeasurementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  KPIMeasurementDispatch: {
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
    loadListRequest: (request: IKPIMeasurementGetListRequest) => dispatch(KPIMeasurementGetListRequest(request)),
    loadListDispose: () => dispatch(KPIMeasurementGetListDispose()),
    loadDetailRequest: (request: IKPIMeasurementGetDetailRequest) => dispatch(KPIMeasurementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIMeasurementGetByIdDispose()),
  }
});

export const withKPIMeasurement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);