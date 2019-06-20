import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import { 
  IHRMeasurementDeleteRequest, 
  IHRMeasurementGetAllRequest, 
  IHRMeasurementGetDetailRequest, 
  IHRMeasurementPostRequest,
  IHRMeasurementPutRequest
} from '@hr/classes/queries/measurement';
import { IHRMeasurement, IHRMeasurementDetail } from '@hr/classes/response/measurement';
import { 
  hrMeasurementDeleteDispose, 
  hrMeasurementDeleteRequest, 
  hrMeasurementGetAllDispose, 
  hrMeasurementGetAllRequest, 
  hrMeasurementGetByIdDispose, 
  hrMeasurementGetByIdRequest, 
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
    deleteRequest: typeof hrMeasurementDeleteRequest;
    deleteDispose: typeof hrMeasurementDeleteDispose;

    // query
    loadAllRequest: typeof hrMeasurementGetAllRequest;
    loadAllDispose: typeof hrMeasurementGetAllDispose;
    loadDetailRequest: typeof hrMeasurementGetByIdRequest;
    loadDetailDispose: typeof hrMeasurementGetByIdDispose;
  };
}

export interface WithHRMeasurement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrMeasurementGetAll, hrMeasurementGetById }: IAppState) => ({
  hrMeasurementState: {
    all: hrMeasurementGetAll,
    detail: hrMeasurementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrMeasurementDispatch: {
    // command
    createRequest: (request: IHRMeasurementPostRequest) => dispatch(hrMeasurementPostRequest(request)),
    createDispose: () => dispatch(hrMeasurementPostDispose()),
    updateRequest: (request: IHRMeasurementPutRequest) => dispatch(hrMeasurementPutRequest(request)),
    updateDispose: () => dispatch(hrMeasurementPutDispose()),
    deleteRequest: (request: IHRMeasurementDeleteRequest) => dispatch(hrMeasurementDeleteRequest(request)),
    deleteDispose: () => dispatch(hrMeasurementDeleteDispose()),
    
    // query
    loadAllRequest: (request: IHRMeasurementGetAllRequest) => dispatch(hrMeasurementGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrMeasurementGetAllDispose()),
    loadDetailRequest: (request: IHRMeasurementGetDetailRequest) => dispatch(hrMeasurementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrMeasurementGetByIdDispose()),
  }
});

export const withHRMeasurement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);