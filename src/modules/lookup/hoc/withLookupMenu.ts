import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IMenuGetAllRequest, IMenuGetByIdRequest, IMenuListRequest } from '@lookup/classes/queries/menu';
import { IMenu, IMenuDetail, IMenuList } from '@lookup/classes/response/menu';
import {
  lookupMenuGetAllDispose,
  lookupMenuGetAllRequest,
  lookupMenuGetByIdDispose,
  lookupMenuGetByIdRequest,
  lookupMenuGetListDispose,
  lookupMenuGetListRequest,
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupMenuState: {
    all: IQueryCollectionState<IMenuGetAllRequest, IMenu>;
    list: IQueryCollectionState<IMenuListRequest, IMenuList>;
    detail: IQuerySingleState<IMenuGetByIdRequest, IMenuDetail>;
  };
}

interface PropsFromDispatch {
  lookupMenuDispatch: {
    // command

    // query
    loadAllRequest: typeof lookupMenuGetAllRequest;
    loadAllDispose: typeof lookupMenuGetAllDispose;
    loadListRequest: typeof lookupMenuGetListRequest;
    loadListDispose: typeof lookupMenuGetListDispose;
    loadDetailRequest: typeof lookupMenuGetByIdRequest;
    loadDetailDispose: typeof lookupMenuGetByIdDispose;
  };
}

export interface WithLookupMenu extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupMenuGetAll, lookupMenuGetList, lookupMenuGetById }: IAppState) => ({
  lookupMenuState: {
    all: lookupMenuGetAll,
    list: lookupMenuGetList,
    detail: lookupMenuGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupMenuDispatch: {
    // command
    
    // query
    loadAllRequest: (request: IMenuGetAllRequest) => dispatch(lookupMenuGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupMenuGetAllDispose()),
    loadListRequest: (request: IMenuListRequest) => dispatch(lookupMenuGetListRequest(request)),
    loadListDispose: () => dispatch(lookupMenuGetListDispose()),
    loadDetailRequest: (request: IMenuGetByIdRequest) => dispatch(lookupMenuGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupMenuGetByIdDispose()),
  }
});

export const withLookupMenu = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
