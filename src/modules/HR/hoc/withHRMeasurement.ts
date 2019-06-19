import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import { 
  IHRMeasurementGetAllRequest, 
  IHRMeasurementGetDetailRequest, 
  IHRMeasurementGetListRequest, 
  IHRMeasurementPostRequest, 
  IHRMeasurementPutRequest
} from '@hr/classes/queries/measurement';
import { IHRMeasurement, IHRMeasurementDetail, IHRMeasurementList } from '@hr/classes/response/measurement';
import { 
  hrMeasurementGetAllDispose, 
  hrMeasurementGetAllRequest, 
  hrMeasurementGetByIdDispose, 
  hrMeasurementGetByIdRequest, 
  hrMeasurementGetListDispose, 
  hrMeasurementGetListRequest, 
  hrMeasurementPostDispose, 
  hrMeasurementPostRequest, 
  hrMeasurementPutDispose,
  hrMeasurementPutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrMeasurementState: {
    all: IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement>;
    list: IQueryCollectionState<IHRMeasurementGetListRequest, IHRMeasurementList>;
    detail: IQuerySingleState<IHRMeasurementGetDetailRequest, IHRMeasurementDetail>;
  };
}

interface PropsFromDispatch {
  hrMeasurementDispatch: {
    // command
    createRequest: typeof hrMeasurementPostRequest;
    createDispose: typeof hrMeasurementPostDispose;
    updateRequest: typeof hrMeasurementPutRequest;
    updateDispose: typeof hrMeasurementPutDispose;

    // query
    loadAllRequest: typeof hrMeasurementGetAllRequest;
    loadAllDispose: typeof hrMeasurementGetAllDispose;
    loadListRequest: typeof hrMeasurementGetListRequest;
    loadListDispose: typeof hrMeasurementGetListDispose;
    loadDetailRequest: typeof hrMeasurementGetByIdRequest;
    loadDetailDispose: typeof hrMeasurementGetByIdDispose;
  };
}

export interface WithHRMeasurement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrMeasurementGetAll, hrMeasurementGetList, hrMeasurementGetById }: IAppState) => ({
  hrMeasurementState: {
    all: hrMeasurementGetAll,
    list: hrMeasurementGetList,
    detail: hrMeasurementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrTemplateDispatch: {
    // command
    createRequest: (request: IHRMeasurementPostRequest) => dispatch(hrMeasurementPostRequest(request)),
    createDispose: () => dispatch(hrMeasurementPostDispose()),
    updateRequest: (request: IHRMeasurementPutRequest) => dispatch(hrMeasurementPutRequest(request)),
    updateDispose: () => dispatch(hrMeasurementPutDispose()),
    
    // query
    loadAllRequest: (request: IHRMeasurementGetAllRequest) => dispatch(hrMeasurementGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrMeasurementGetAllDispose()),
    loadListRequest: (request: IHRMeasurementGetListRequest) => dispatch(hrMeasurementGetListRequest(request)),
    loadListDispose: () => dispatch(hrMeasurementGetListDispose()),
    loadDetailRequest: (request: IHRMeasurementGetDetailRequest) => dispatch(hrMeasurementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrMeasurementGetByIdDispose()),
  }
});

export const withHRMeasurement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);