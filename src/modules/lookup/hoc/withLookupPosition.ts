import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IPositionDeleteRequest,
  IPositionGetAllRequest,
  IPositionGetByIdRequest,
  IPositionGetListRequest,
  IPositionPostRequest,
  IPositionPutRequest,
} from '@lookup/classes/queries';
import { IPosition, IPositionDetail, IPositionList } from '@lookup/classes/response';
import {
  positionDeleteDispose,
  positionDeleteRequest,
  positionGetAllDispose,
  positionGetAllRequest,
  positionGetByIdDispose,
  positionGetByIdRequest,
  positionGetListDispose,
  positionGetListRequest,
  positionPostDispose,
  positionPostRequest,
  positionPutDispose,
  positionPutRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupPositionState: {
    all: IQueryCollectionState<IPositionGetAllRequest, IPosition>;
    list: IQueryCollectionState<IPositionGetListRequest, IPositionList>;
    detail: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
  };
}

interface PropsFromDispatch {
  lookupPositionDispatch: {
    // command
    createRequest: typeof positionPostRequest;
    createDispose: typeof positionPostDispose;
    updateRequest: typeof positionPutRequest;
    updateDispose: typeof positionPutDispose;
    deleteRequest: typeof positionDeleteRequest;
    deleteDispose: typeof positionDeleteDispose;

    // query
    loadAllRequest: typeof positionGetAllRequest;
    loadAllDispose: typeof positionGetAllDispose;
    loadListRequest: typeof positionGetListRequest;
    loadListDispose: typeof positionGetListDispose;
    loadDetailRequest: typeof positionGetByIdRequest;
    loadDetailDispose: typeof positionGetByIdDispose;
  };
}

export interface WithLookupPosition extends PropsFromState, PropsFromDispatch { }

const mapStateToProps = ({ positionGetAll, positionGetList, positionGetById }: IAppState) => ({
  lookupPositionState: {
    all: positionGetAll,
    list: positionGetList,
    detail: positionGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupPositionDispatch: {
    // command
    createRequest: (request: IPositionPostRequest) => dispatch(positionPostRequest(request)),
    createDispose: () => dispatch(positionPostDispose()),
    updateRequest: (request: IPositionPutRequest) => dispatch(positionPutRequest(request)),
    updateDispose: () => dispatch(positionPutDispose()),
    deleteRequest: (request: IPositionDeleteRequest) => dispatch(positionDeleteRequest(request)),
    deleteDispose: () => dispatch(positionDeleteDispose()),

    // query
    loadAllRequest: (request: IPositionGetAllRequest) => dispatch(positionGetAllRequest(request)),
    loadAllDispose: () => dispatch(positionGetAllDispose()),
    loadListRequest: (request: IPositionGetListRequest) => dispatch(positionGetListRequest(request)),
    loadListDispose: () => dispatch(positionGetListDispose()),
    loadDetailRequest: (request: IPositionGetByIdRequest) => dispatch(positionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(positionGetByIdDispose()),
  }
});

export const withLookupPosition = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);