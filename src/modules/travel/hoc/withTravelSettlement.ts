import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ITravelSettlementGetAllRequest, 
  ITravelSettlementGetByIdRequest, 
  ITravelSettlementPostRequest, 
  ITravelSettlementPutRequest 
} from '@travel/classes/queries/settlement';
import { ITravelSettlement, ITravelSettlementDetail } from '@travel/classes/response';
import { 
  travelSettlementGetAllDispose, 
  travelSettlementGetAllRequest, 
  travelSettlementGetByIdDispose, 
  travelSettlementGetByIdRequest, 
  travelSettlementPostDispose, 
  travelSettlementPostRequest, 
  travelSettlementPutDispose, 
  travelSettlementPutRequest 
} from '@travel/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  travelSettlementState: {
    all: IQueryCollectionState<ITravelSettlementGetAllRequest, ITravelSettlement>;
    detail: IQuerySingleState<ITravelSettlementGetByIdRequest, ITravelSettlementDetail>;
  };
}

interface PropsFromDispatch {
  travelSettlementDispatch: {
    // command
    createRequest: typeof travelSettlementPostRequest;
    createDispose: typeof travelSettlementPostDispose;
    updateRequest: typeof travelSettlementPutRequest;
    updateDispose: typeof travelSettlementPutDispose;

    // query
    loadAllRequest: typeof travelSettlementGetAllRequest;
    loadAllDispose: typeof travelSettlementGetAllDispose;
    loadDetailRequest: typeof travelSettlementGetByIdRequest;
    loadDetailDispose: typeof travelSettlementGetByIdDispose;
  };
}

export interface WithTravelSettlement extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ travelSettlementGetAll, travelSettlementGetById }: IAppState) => ({
  travelSettlementState: {
    all: travelSettlementGetAll,
    detail: travelSettlementGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  travelSettlementDispatch: {
    // command
    createRequest: (request: ITravelSettlementPostRequest) => dispatch(travelSettlementPostRequest(request)),
    createDispose: () => dispatch(travelSettlementPostDispose()),
    updateRequest: (request: ITravelSettlementPutRequest) => dispatch(travelSettlementPutRequest(request)),
    updateDispose: () => dispatch(travelSettlementPutDispose()),
    
    // query
    loadAllRequest: (request: ITravelSettlementGetAllRequest) => dispatch(travelSettlementGetAllRequest(request)),
    loadAllDispose: () => dispatch(travelSettlementGetAllDispose()),
    loadDetailRequest: (request: ITravelSettlementGetByIdRequest) => dispatch(travelSettlementGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(travelSettlementGetByIdDispose()),
  }
});

export const withTravelSettlement = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);