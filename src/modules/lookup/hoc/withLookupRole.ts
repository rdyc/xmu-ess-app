import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ILookupRoleDeleteRequest, 
  ILookupRoleGetAllRequest, 
  ILookupRoleGetDetailRequest, 
  ILookupRoleGetListRequest, 
  ILookupRolePostRequest, 
  ILookupRolePutRequest 
} from '@lookup/classes/queries/role';
import { IRole, IRoleDetail, IRoleList } from '@lookup/classes/response';
import { 
  lookupRoleDeleteDispose, 
  lookupRoleDeleteRequest, 
  lookupRoleGetAllDispose, 
  lookupRoleGetAllRequest, 
  lookupRoleGetByIdDispose, 
  lookupRoleGetByIdRequest, 
  lookupRoleGetListDispose, 
  lookupRoleGetListRequest, 
  lookupRolePostDispose, 
  lookupRolePostRequest, 
  lookupRolePutDispose, 
  lookupRolePutRequest 
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupRoleState: {
    all: IQueryCollectionState<ILookupRoleGetAllRequest, IRole>;
    list: IQueryCollectionState<ILookupRoleGetListRequest, IRoleList>;
    detail: IQuerySingleState<ILookupRoleGetDetailRequest, IRoleDetail>;
  };
}

interface PropsFromDispatch {
  lookupRoleDispatch: {
    // command
    createRequest: typeof lookupRolePostRequest;
    createDispose: typeof lookupRolePostDispose;
    updateRequest: typeof lookupRolePutRequest;
    updateDispose: typeof lookupRolePutDispose;
    deleteRequest: typeof lookupRoleDeleteRequest;
    deleteDispose: typeof lookupRoleDeleteDispose;

    // query
    loadAllRequest: typeof lookupRoleGetAllRequest;
    loadAllDispose: typeof lookupRoleGetAllDispose;
    loadListRequest: typeof lookupRoleGetListRequest;
    loadListDispose: typeof lookupRoleGetListDispose;
    loadDetailRequest: typeof lookupRoleGetByIdRequest;
    loadDetailDispose: typeof lookupRoleGetByIdDispose;
  };
}

export interface WithLookupRole extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupRoleGetAll, lookupRoleGetList, lookupRoleGetById }: IAppState) => ({
  lookupRoleState: {
    all: lookupRoleGetAll,
    list: lookupRoleGetList,
    detail: lookupRoleGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupRoleDispatch: {
    // command
    createRequest: (request: ILookupRolePostRequest) => dispatch(lookupRolePostRequest(request)),
    createDispose: () => dispatch(lookupRolePostDispose()),
    updateRequest: (request: ILookupRolePutRequest) => dispatch(lookupRolePutRequest(request)),
    updateDispose: () => dispatch(lookupRolePutDispose()),
    deleteRequest: (request: ILookupRoleDeleteRequest) => dispatch(lookupRoleDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupRoleDeleteDispose()),
    
    // query
    loadAllRequest: (request: ILookupRoleGetAllRequest) => dispatch(lookupRoleGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupRoleGetAllDispose()),
    loadListRequest: (request: ILookupRoleGetListRequest) => dispatch(lookupRoleGetListRequest(request)),
    loadListDispose: () => dispatch(lookupRoleGetListDispose()),
    loadDetailRequest: (request: ILookupRoleGetDetailRequest) => dispatch(lookupRoleGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupRoleGetByIdDispose()),
  }
});

export const withLookupRole = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);