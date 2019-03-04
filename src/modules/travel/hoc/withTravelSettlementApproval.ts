import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITravelSettlementApprovalGetAllRequest, ITravelSettlementApprovalGetByIdRequest, ITravelSettlementApprovalPostRequest } from '@travel/classes/queries/settlementApproval';
import { ITravelSettlement, ITravelSettlementRequestDetail } from '@travel/classes/response';
import { 
  travelSettlementApprovalGetAllDispose,
  travelSettlementApprovalGetAllRequest,
  travelSettlementApprovalGetByIdDispose,
  travelSettlementApprovalGetByIdRequest,
  travelSettlementApprovalPostDispose,
  travelSettlementApprovalPostRequest
} from '@travel/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  travelSettlementApprovalState: {
    all: IQueryCollectionState<ITravelSettlementApprovalGetAllRequest, ITravelSettlement>;
    detail: IQuerySingleState<ITravelSettlementApprovalGetByIdRequest, ITravelSettlementRequestDetail>;
  };
}

interface PropsFromDispatch {
  travelSettlementApprovalDispatch: {
    // command
    createRequest: typeof travelSettlementApprovalPostRequest;
    createDispose: typeof travelSettlementApprovalPostDispose;

    // query
    loadAllRequest: typeof travelSettlementApprovalGetAllRequest;
    loadAllDispose: typeof travelSettlementApprovalGetAllDispose;
    loadDetailRequest: typeof travelSettlementApprovalGetByIdRequest;
    loadDetailDispose: typeof travelSettlementApprovalGetByIdDispose;
  };
}

export interface WithTravelSettlementApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ travelSettlementApprovalGetAll, travelSettlementApprovalGetById }: IAppState) => ({
  travelSettlementApprovalState: {
    all: travelSettlementApprovalGetAll,
    detail: travelSettlementApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  travelSettlementApprovalDispatch: {
    // command
    createRequest: (request: ITravelSettlementApprovalPostRequest) => dispatch(travelSettlementApprovalPostRequest(request)),
    createDispose: () => dispatch(travelSettlementApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: ITravelSettlementApprovalGetAllRequest) => dispatch(travelSettlementApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(travelSettlementApprovalGetAllDispose()),
    loadDetailRequest: (request: ITravelSettlementApprovalGetByIdRequest) => dispatch(travelSettlementApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(travelSettlementApprovalGetByIdDispose()),
  }
});

export const withTravelSettlementApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);