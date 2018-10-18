import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ILookupCustomerGetAllRequest,
  ILookupCustomerGetDetailRequest,
  ILookupCustomerGetListRequest,
} from '@lookup/classes/queries';
import {
  ILookupCustomerDeleteRequest,
  ILookupCustomerPostRequest,
  ILookupCustomerPutRequest,
} from '@lookup/classes/queries/customer';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/classes/response';
import {
  lookupCustomerDeleteDispose,
  lookupCustomerDeleteRequest,
  lookupCustomerGetAllDispose,
  lookupCustomerGetAllRequest,
  lookupCustomerGetByIdDispose,
  lookupCustomerGetByIdRequest,
  lookupCustomerGetListDispose,
  lookupCustomerGetListRequest,
  lookupCustomerPostDispose,
  lookupCustomerPostRequest,
  lookupCustomerPutDispose,
  lookupCustomerPutRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupCustomerState: {
    all: IQueryCollectionState<ILookupCustomerGetAllRequest, ICustomer>;
    list: IQueryCollectionState<ILookupCustomerGetListRequest, ICustomerList>;
    detail: IQuerySingleState<ILookupCustomerGetDetailRequest, ICustomerDetail>;
  };
}

interface PropsFromDispatch {
  lookupCustomerDispatch: {
    // command
    createRequest: typeof lookupCustomerPostRequest;
    createDispose: typeof lookupCustomerPostDispose;
    updateRequest: typeof lookupCustomerPutRequest;
    updateDispose: typeof lookupCustomerPutDispose;
    deleteRequest: typeof lookupCustomerDeleteRequest;
    deleteDispose: typeof lookupCustomerDeleteDispose;

    // query
    loadAllRequest: typeof lookupCustomerGetAllRequest;
    loadAllDispose: typeof lookupCustomerGetAllDispose;
    loadListRequest: typeof lookupCustomerGetListRequest;
    loadListDispose: typeof lookupCustomerGetListDispose;
    loadDetailRequest: typeof lookupCustomerGetByIdRequest;
    loadDetailDispose: typeof lookupCustomerGetByIdDispose;
  };
}

export interface WithLookupCustomer extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupCustomerGetAll, lookupCustomerGetList, lookupCustomerGetById }: IAppState) => ({
  lookupCustomerState: {
    all: lookupCustomerGetAll,
    list: lookupCustomerGetList,
    detail: lookupCustomerGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupCustomerDispatch: {
    // command
    createRequest: (request: ILookupCustomerPostRequest) => dispatch(lookupCustomerPostRequest(request)),
    createDispose: () => dispatch(lookupCustomerPostDispose()),
    updateRequest: (request: ILookupCustomerPutRequest) => dispatch(lookupCustomerPutRequest(request)),
    updateDispose: () => dispatch(lookupCustomerPutDispose()),
    deleteRequest: (request: ILookupCustomerDeleteRequest) => dispatch(lookupCustomerDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupCustomerDeleteDispose()),
    
    // query
    loadAllRequest: (request: ILookupCustomerGetAllRequest) => dispatch(lookupCustomerGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupCustomerGetAllDispose()),
    loadListRequest: (request: ILookupCustomerGetListRequest) => dispatch(lookupCustomerGetListRequest(request)),
    loadListDispose: () => dispatch(lookupCustomerGetListDispose()),
    loadDetailRequest: (request: ILookupCustomerGetDetailRequest) => dispatch(lookupCustomerGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupCustomerGetByIdDispose()),
  }
});

export const withLookupCustomer = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);