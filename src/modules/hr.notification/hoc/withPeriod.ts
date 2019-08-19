import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPeriodDeleteRequest,
  IPeriodGetAllRequest,
  IPeriodGetByIdRequest,
  IPeriodPostRequest,
  IPeriodPutRequest,
} from '@hr.notification/classes/queries/period';
import { IPeriod } from '@hr.notification/classes/response';
import {
  periodDeleteDispose,
  periodDeleteRequest,
  periodGetAllDispose,
  periodGetAllRequest,
  periodGetByIdDispose,
  periodGetByIdRequest,
  periodPostDispose,
  periodPostRequest,
  periodPutDispose,
  periodPutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notifPeriodState: {
    all: IQueryCollectionState<IPeriodGetAllRequest, IPeriod>;
    detail: IQuerySingleState<IPeriodGetByIdRequest, IPeriod>;
  };
}

interface PropsFromDispatch {
  notifPeriodDispatch: {
    // command
    createRequest: typeof periodPostRequest;
    createDispose: typeof periodPostDispose;
    updateRequest: typeof periodPutRequest;
    updateDispose: typeof periodPutDispose;
    deleteRequest: typeof periodDeleteRequest;
    deleteDispose: typeof periodDeleteDispose;

    // query
    loadAllRequest: typeof periodGetAllRequest;
    loadAllDispose: typeof periodGetAllDispose;
    loadDetailRequest: typeof periodGetByIdRequest;
    loadDetailDispose: typeof periodGetByIdDispose;
  };
}

export interface WithPeriod extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ periodGetAll, periodGetById }: IAppState) => ({
  notifPeriodState: {
    all: periodGetAll,
    detail: periodGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notifPeriodDispatch: {
    // command
    createRequest: (request: IPeriodPostRequest) => dispatch(periodPostRequest(request)),
    createDispose: () => dispatch(periodPostDispose()),
    updateRequest: (request: IPeriodPutRequest) => dispatch(periodPutRequest(request)),
    updateDispose: () => dispatch(periodPutDispose()),
    deleteRequest: (request: IPeriodDeleteRequest) => dispatch(periodDeleteRequest(request)),
    deleteDispose: () => dispatch(periodDeleteDispose()),
    
    // query
    loadAllRequest: (request: IPeriodGetAllRequest) => dispatch(periodGetAllRequest(request)),
    loadAllDispose: () => dispatch(periodGetAllDispose()),
    loadDetailRequest: (request: IPeriodGetByIdRequest) => dispatch(periodGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(periodGetByIdDispose()),
  }
});

export const withPeriod = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);