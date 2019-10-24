import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IWebJobRecurringDeleteRequest, IWebJobRecurringGetAllRequest, 
  IWebJobRecurringGetDetailRequest, IWebJobRecurringPostRequest, 
  IWebJobRecurringPutRequest, IWebJobRecurringTriggerRequest 
} from '@webjob/classes/queries';
import { IWebJobRecurring, IWebJobRecurringDetail } from '@webjob/classes/response';
import { 
  webJobRecurringDeleteDispose, webJobRecurringDeleteRequest, 
  webJobRecurringGetAllDispose, webJobRecurringGetAllRequest, 
  webJobRecurringGetByIdDispose, webJobRecurringGetByIdRequest,
  webJobRecurringPostDispose, webJobRecurringPostRequest,
  webJobRecurringPutDispose, webJobRecurringPutRequest,
  webJobRecurringTriggerDispose, webJobRecurringTriggerRequest 
} from '@webjob/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  webJobRecurringState: {
    all: IQueryCollectionState<IWebJobRecurringGetAllRequest, IWebJobRecurring>;
    detail: IQuerySingleState<IWebJobRecurringGetDetailRequest, IWebJobRecurringDetail>;
  };
}

interface PropsFromDispatch {
  webJobRecurringDispatch: {
    // command
    createRequest: typeof webJobRecurringPostRequest;
    createDispose: typeof webJobRecurringPostDispose;
    updateRequest: typeof webJobRecurringPutRequest;
    updateDispose: typeof webJobRecurringPutDispose;
    deleteRequest: typeof webJobRecurringDeleteRequest;
    deleteDispose: typeof webJobRecurringDeleteDispose;
    triggerRequest: typeof webJobRecurringTriggerRequest;
    triggerDispose: typeof webJobRecurringTriggerDispose;

    // query
    loadAllRequest: typeof webJobRecurringGetAllRequest;
    loadAllDispose: typeof webJobRecurringGetAllDispose;
    loadDetailRequest: typeof webJobRecurringGetByIdRequest;
    loadDetailDispose: typeof webJobRecurringGetByIdDispose;
  };
}

export interface WithWebJobRecurring extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ webJobRecurringGetAll, webJobRecurringGetDetail }: IAppState) => ({
  webJobRecurringState: {
    all: webJobRecurringGetAll,
    detail: webJobRecurringGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  webJobRecurringDispatch: {
    // command
    createRequest: (request: IWebJobRecurringPostRequest) => dispatch(webJobRecurringPostRequest(request)),
    createDispose: () => dispatch(webJobRecurringPostDispose()),
    updateRequest: (request: IWebJobRecurringPutRequest) => dispatch(webJobRecurringPutRequest(request)),
    updateDispose: () => dispatch(webJobRecurringPutDispose()),
    deleteRequest: (request: IWebJobRecurringDeleteRequest) => dispatch(webJobRecurringDeleteRequest(request)),
    deleteDispose: () => dispatch(webJobRecurringDeleteDispose()),
    triggerRequest: (request: IWebJobRecurringTriggerRequest) => dispatch(webJobRecurringTriggerRequest(request)),
    triggerDispose: () => dispatch(webJobRecurringTriggerDispose()),

    // query
    loadAllRequest: (request: IWebJobRecurringGetAllRequest) => dispatch(webJobRecurringGetAllRequest(request)),
    loadAllDispose: () => dispatch(webJobRecurringGetAllDispose()),
    loadDetailRequest: (request: IWebJobRecurringGetDetailRequest) => dispatch(webJobRecurringGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(webJobRecurringGetByIdDispose()),
  }
});

export const withWebJobRecurring = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);