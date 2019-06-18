import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import { 
  IHRMeasurementGetAllRequest, 
  IHRMeasurementGetDetailRequest, 
  IHRMeasurementPostRequest, 
  IHRMeasurementPutRequest 
} from '@hr/classes/queries/measurement';
import { IHRMeasurement, IHRMeasurementDetail } from '@hr/classes/response/measurement';
import { 
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
  hrTemplateState: {
    all: IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement>;
    detail: IQuerySingleState<IHRMeasurementGetDetailRequest, IHRMeasurementDetail>;
  };
}

interface PropsFromDispatch {
  hrTemplateDispatch: {
    // command
    createRequest: typeof hrMeasurementPostRequest;
    createDispose: typeof hrMeasurementPostDispose;
    updateRequest: typeof hrMeasurementPutRequest;
    updateDispose: typeof hrMeasurementPutDispose;

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
  hrTemplateDispatch: {
    // command
    createRequest: (request: IHRMeasurementPostRequest) => dispatch(hrMeasurementPostRequest(request)),
    createDispose: () => dispatch(hrMeasurementPostDispose()),
    updateRequest: (request: IHRMeasurementPutRequest) => dispatch(hrMeasurementPutRequest(request)),
    updateDispose: () => dispatch(hrMeasurementPutDispose()),
    
    // query
    loadAllRequest: (request: IHRMeasurementGetAllRequest) => dispatch(hrMeasurementGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrMeasurementGetAllDispose()),
    loadDetailRequest: (request: IHRMeasurementGetDetailRequest) => dispatch(hrMeasurementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrMeasurementGetByIdDispose()),
  }
});

export const withHRMeasurement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);