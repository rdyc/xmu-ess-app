import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IMenuGetAllRequest, IMenuGetByIdRequest, IMenuListRequest } from '@lookup/classes/queries/menu';
import { IMenu, IMenuDetail, IMenuList } from '@lookup/classes/response/menu';
import { menuGetAllDispose, menuGetAllRequest, menuGetByIdDispose, menuGetByIdRequest, menuGetListDispose, menuGetListRequest } from '@lookup/store/actions';
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
    loadAllRequest: typeof menuGetAllRequest;
    loadAllDispose: typeof menuGetAllDispose;
    loadListRequest: typeof menuGetListRequest;
    loadListDispose: typeof menuGetListDispose;
    loadDetailRequest: typeof menuGetByIdRequest;
    loadDetailDispose: typeof menuGetByIdDispose;
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
    loadAllRequest: (request: IMenuGetAllRequest) => dispatch(menuGetAllRequest(request)),
    loadAllDispose: () => dispatch(menuGetAllDispose()),
    loadListRequest: (request: IMenuListRequest) => dispatch(menuGetListRequest(request)),
    loadListDispose: () => dispatch(menuGetListDispose()),
    loadDetailRequest: (request: IMenuGetByIdRequest) => dispatch(menuGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(menuGetByIdDispose()),
  }
});

export const withLookupMenu = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
