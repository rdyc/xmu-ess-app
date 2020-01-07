import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  INotifPeriodDeleteRequest,
  INotifPeriodGetAllRequest,
  INotifPeriodGetByIdRequest,
  INotifPeriodPostRequest,
  INotifPeriodPutRequest,
} from '@hr.notification/classes/queries/period';
import { INotifPeriod } from '@hr.notification/classes/response';
import {
  notifPeriodDeleteDispose,
  notifPeriodDeleteRequest,
  notifPeriodGetAllDispose,
  notifPeriodGetAllRequest,
  notifPeriodGetByIdDispose,
  notifPeriodGetByIdRequest,
  notifPeriodPostDispose,
  notifPeriodPostRequest,
  notifPeriodPutDispose,
  notifPeriodPutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notifPeriodState: {
    all: IQueryCollectionState<INotifPeriodGetAllRequest, INotifPeriod>;
    detail: IQuerySingleState<INotifPeriodGetByIdRequest, INotifPeriod>;
  };
}

interface PropsFromDispatch {
  notifPeriodDispatch: {
    // command
    createRequest: typeof notifPeriodPostRequest;
    createDispose: typeof notifPeriodPostDispose;
    updateRequest: typeof notifPeriodPutRequest;
    updateDispose: typeof notifPeriodPutDispose;
    deleteRequest: typeof notifPeriodDeleteRequest;
    deleteDispose: typeof notifPeriodDeleteDispose;

    // query
    loadAllRequest: typeof notifPeriodGetAllRequest;
    loadAllDispose: typeof notifPeriodGetAllDispose;
    loadDetailRequest: typeof notifPeriodGetByIdRequest;
    loadDetailDispose: typeof notifPeriodGetByIdDispose;
  };
}

export interface WithNotifPeriod extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ periodGetAll, periodGetById }: IAppState) => ({
  notifPeriodState: {
    all: periodGetAll,
    detail: periodGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notifPeriodDispatch: {
    // command
    createRequest: (request: INotifPeriodPostRequest) => dispatch(notifPeriodPostRequest(request)),
    createDispose: () => dispatch(notifPeriodPostDispose()),
    updateRequest: (request: INotifPeriodPutRequest) => dispatch(notifPeriodPutRequest(request)),
    updateDispose: () => dispatch(notifPeriodPutDispose()),
    deleteRequest: (request: INotifPeriodDeleteRequest) => dispatch(notifPeriodDeleteRequest(request)),
    deleteDispose: () => dispatch(notifPeriodDeleteDispose()),
    
    // query
    loadAllRequest: (request: INotifPeriodGetAllRequest) => dispatch(notifPeriodGetAllRequest(request)),
    loadAllDispose: () => dispatch(notifPeriodGetAllDispose()),
    loadDetailRequest: (request: INotifPeriodGetByIdRequest) => dispatch(notifPeriodGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(notifPeriodGetByIdDispose()),
  }
});

export const withNotifPeriod = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);