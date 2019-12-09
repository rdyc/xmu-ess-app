import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelGetAllowedRequest, 
  ITravelGetAllRequest, 
  ITravelGetByIdRequest, 
  ITravelPostRequest, 
  ITravelPutRequest
} from '@travel/classes/queries';
import { ITravelAllowedCreate, ITravelRequest, ITravelRequestDetail } from '@travel/classes/response';
import { 
  travelGetAllDispose, 
  travelGetAllowedDispose, 
  travelGetAllowedRequest, 
  travelGetAllRequest, 
  travelGetByIdDispose, 
  travelGetByIdRequest, 
  travelPostDispose, 
  travelPostRequest,
  travelPutDispose,
  travelPutRequest
} from '@travel/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  travelRequestState: {
    all: IQueryCollectionState<ITravelGetAllRequest, ITravelRequest>;
    detail: IQuerySingleState<ITravelGetByIdRequest, ITravelRequestDetail>;
    allowed: IQuerySingleState<ITravelGetAllowedRequest, ITravelAllowedCreate>;
  };
}

interface PropsFromDispatch {
  travelRequestDispatch: {
    // command
    createRequest: typeof travelPostRequest;
    createDispose: typeof travelPostDispose;
    updateRequest: typeof travelPutRequest;
    updateDispose: typeof travelPutDispose;

    // query
    loadAllRequest: typeof travelGetAllRequest;
    loadAllDispose: typeof travelGetAllDispose;
    loadDetailRequest: typeof travelGetByIdRequest;
    loadDetailDispose: typeof travelGetByIdDispose;
    loadAllowedRequest: typeof travelGetAllowedRequest;
    loadAllowedDispose: typeof travelGetAllowedDispose;
  };
}

export interface WithTravelRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ travelRequestGetAll, travelRequestGetById, travelAllowed }: IAppState) => ({
  travelRequestState: {
    all: travelRequestGetAll,
    detail: travelRequestGetById,
    allowed: travelAllowed
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  travelRequestDispatch: {
    // command
    createRequest: (request: ITravelPostRequest) => dispatch(travelPostRequest(request)),
    createDispose: () => dispatch(travelPostDispose()),
    updateRequest: (request: ITravelPutRequest) => dispatch(travelPutRequest(request)),
    updateDispose: () => dispatch(travelPutDispose()),
    
    // query
    loadAllRequest: (request: ITravelGetAllRequest) => dispatch(travelGetAllRequest(request)),
    loadAllDispose: () => dispatch(travelGetAllDispose()),
    loadDetailRequest: (request: ITravelGetByIdRequest) => dispatch(travelGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(travelGetByIdDispose()),
    loadAllowedRequest: (request: ITravelGetAllowedRequest) => dispatch(travelGetAllowedRequest(request)),
    loadAllowedDispose: () => dispatch(travelGetAllowedDispose()),
  }
});

export const withTravelRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);