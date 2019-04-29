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
  lookupPositionDeleteDispose,
  lookupPositionDeleteRequest,
  lookupPositionGetAllDispose,
  lookupPositionGetAllRequest,
  lookupPositionGetByIdDispose,
  lookupPositionGetByIdRequest,
  lookupPositionGetListDispose,
  lookupPositionGetListRequest,
  lookupPositionPostDispose,
  lookupPositionPostRequest,
  lookupPositionPutDispose,
  lookupPositionPutRequest,
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
    createRequest: typeof lookupPositionPostRequest;
    createDispose: typeof lookupPositionPostDispose;
    updateRequest: typeof lookupPositionPutRequest;
    updateDispose: typeof lookupPositionPutDispose;
    deleteRequest: typeof lookupPositionDeleteRequest;
    deleteDispose: typeof lookupPositionDeleteDispose;

    // query
    loadAllRequest: typeof lookupPositionGetAllRequest;
    loadAllDispose: typeof lookupPositionGetAllDispose;
    loadListRequest: typeof lookupPositionGetListRequest;
    loadListDispose: typeof lookupPositionGetListDispose;
    loadDetailRequest: typeof lookupPositionGetByIdRequest;
    loadDetailDispose: typeof lookupPositionGetByIdDispose;
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
    createRequest: (request: IPositionPostRequest) => dispatch(lookupPositionPostRequest(request)),
    createDispose: () => dispatch(lookupPositionPostDispose()),
    updateRequest: (request: IPositionPutRequest) => dispatch(lookupPositionPutRequest(request)),
    updateDispose: () => dispatch(lookupPositionPutDispose()),
    deleteRequest: (request: IPositionDeleteRequest) => dispatch(lookupPositionDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupPositionDeleteDispose()),

    // query
    loadAllRequest: (request: IPositionGetAllRequest) => dispatch(lookupPositionGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupPositionGetAllDispose()),
    loadListRequest: (request: IPositionGetListRequest) => dispatch(lookupPositionGetListRequest(request)),
    loadListDispose: () => dispatch(lookupPositionGetListDispose()),
    loadDetailRequest: (request: IPositionGetByIdRequest) => dispatch(lookupPositionGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupPositionGetByIdDispose()),
  }
});

export const withLookupPosition = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);