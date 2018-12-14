import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IOrganizationHierarchyAllRequest,
  IOrganizationHierarchyByIdRequest,
  IOrganizationHierarchyDeleteRequest,
  IOrganizationHierarchyListRequest,
  IOrganizationHierarchyPostRequest,
  IOrganizationHierarchyPutRequest,
} from '@organization/classes/queries/hierarchy';
import { IHierarchy, IHierarchyDetail, IHierarchyList } from '@organization/classes/response/hierarchy';
import {
  organizationHierarchyDeleteDispose,
  organizationHierarchyDeleteRequest,
  organizationHierarchyGetAllDispose,
  organizationHierarchyGetAllRequest,
  organizationHierarchyGetByIdDispose,
  organizationHierarchyGetByIdRequest,
  organizationHierarchyGetListDispose,
  organizationHierarchyGetListRequest,
  organizationHierarchyPostDispose,
  organizationHierarchyPostRequest,
  organizationHierarchyPutDispose,
  organizationHierarchyPutRequest,
} from '@organization/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  organizationHierarchyState: {
    all: IQueryCollectionState<IOrganizationHierarchyAllRequest, IHierarchy>;
    list: IQueryCollectionState<IOrganizationHierarchyListRequest, IHierarchyList>;
    detail: IQuerySingleState<IOrganizationHierarchyByIdRequest, IHierarchyDetail>;
  };
}

interface PropsFromDispatch {
  organizationHierarchyDispatch: {
    // command
    createRequest: typeof organizationHierarchyPostRequest;
    createDispose: typeof organizationHierarchyPostDispose;
    updateRequest: typeof organizationHierarchyPutRequest;
    updateDispose: typeof organizationHierarchyPutDispose;
    deleteRequest: typeof organizationHierarchyDeleteRequest;
    deleteDispose: typeof organizationHierarchyDeleteDispose;

    // query
    loadAllRequest: typeof organizationHierarchyGetAllRequest;
    loadAllDispose: typeof organizationHierarchyGetAllDispose;
    loadListRequest: typeof organizationHierarchyGetListRequest;
    loadListDispose: typeof organizationHierarchyGetListDispose;
    loadDetailRequest: typeof organizationHierarchyGetByIdRequest;
    loadDetailDispose: typeof organizationHierarchyGetByIdDispose;
  };
}

export interface WithOrganizationHierarchy extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ organizationHierarchyGetAll, organizationHierarchyGetList, organizationHierarchyGetById }: IAppState) => ({
  organizationHierarchyState: {
    all: organizationHierarchyGetAll,
    list: organizationHierarchyGetList,
    detail: organizationHierarchyGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  organizationHierarchyDispatch: {
    // command
    createRequest: (request: IOrganizationHierarchyPostRequest) => dispatch(organizationHierarchyPostRequest(request)),
    createDispose: () => dispatch(organizationHierarchyPostDispose()),
    updateRequest: (request: IOrganizationHierarchyPutRequest) => dispatch(organizationHierarchyPutRequest(request)),
    updateDispose: () => dispatch(organizationHierarchyPutDispose()),
    deleteRequest: (request: IOrganizationHierarchyDeleteRequest) => dispatch(organizationHierarchyDeleteRequest(request)),
    deleteDispose: () => dispatch(organizationHierarchyDeleteDispose()),
    
    // query
    loadAllRequest: (request: IOrganizationHierarchyAllRequest) => dispatch(organizationHierarchyGetAllRequest(request)),
    loadAllDispose: () => dispatch(organizationHierarchyGetAllDispose()),
    loadListRequest: (request: IOrganizationHierarchyListRequest) => dispatch(organizationHierarchyGetListRequest(request)),
    loadListDispose: () => dispatch(organizationHierarchyGetListDispose()),
    loadDetailRequest: (request: IOrganizationHierarchyByIdRequest) => dispatch(organizationHierarchyGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(organizationHierarchyGetByIdDispose()),
  }
});

export const withOrganizationHierarchy = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);