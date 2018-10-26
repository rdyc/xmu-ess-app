import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelGetAllRequest, 
  ITravelGetByIdRequest, 
  ITravelPostRequest, 
  ITravelPutRequest 
} from '@travel/classes/queries';
import { ITravelRequest, ITravelRequestDetail } from '@travel/classes/response';
import { 
  travelGetAllDispose, 
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
  };
}

export interface WithTravelRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ travelRequestGetAll, travelRequestGetById }: IAppState) => ({
  travelRequestState: {
    all: travelRequestGetAll,
    detail: travelRequestGetById
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
  }
});

export const withTravelRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);