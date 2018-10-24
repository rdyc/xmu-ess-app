import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITravelApprovalGetAllRequest, ITravelApprovalGetByIdRequest, ITravelApprovalPostRequest } from '@travel/classes/queries/requestApproval';
import { ITravelRequest, ITravelRequestDetail } from '@travel/classes/response';
import { 
  travelApprovalGetAllDispose, 
  travelApprovalGetAllRequest, 
  travelApprovalGetByIdDispose, 
  travelApprovalGetByIdRequest, 
  travelApprovalPostDispose, 
  travelApprovalPostRequest
} from '@travel/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  travelApprovalState: {
    all: IQueryCollectionState<ITravelApprovalGetAllRequest, ITravelRequest>;
    detail: IQuerySingleState<ITravelApprovalGetByIdRequest, ITravelRequestDetail>;
  };
}

interface PropsFromDispatch {
  travelApprovalDispatch: {
    // command
    createRequest: typeof travelApprovalPostRequest;
    createDispose: typeof travelApprovalPostDispose;

    // query
    loadAllRequest: typeof travelApprovalGetAllRequest;
    loadAllDispose: typeof travelApprovalGetAllDispose;
    loadDetailRequest: typeof travelApprovalGetByIdRequest;
    loadDetailDispose: typeof travelApprovalGetByIdDispose;
  };
}

export interface WithTravelApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ travelApprovalGetAll, travelApprovalGetById }: IAppState) => ({
  travelRequestState: {
    all: travelApprovalGetAll,
    detail: travelApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  travelApprovalDispatch: {
    // command
    createRequest: (request: ITravelApprovalPostRequest) => dispatch(travelApprovalPostRequest(request)),
    createDispose: () => dispatch(travelApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: ITravelApprovalGetAllRequest) => dispatch(travelApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(travelApprovalGetAllDispose()),
    loadDetailRequest: (request: ITravelApprovalGetByIdRequest) => dispatch(travelApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(travelApprovalGetByIdDispose()),
  }
});

export const withTravelApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);