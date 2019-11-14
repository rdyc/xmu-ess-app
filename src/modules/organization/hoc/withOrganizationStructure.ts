import { IEmployee } from '@account/classes/response';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IOrganizationStructureAllRequest,
  IOrganizationStructureByIdRequest,
  IOrganizationStructureDeleteRequest,
  IOrganizationStructurePostRequest,
  IOrganizationStructurePutRequest,
  IOrganizationStructureSubOrdinateListRequest,
} from '@organization/classes/queries/structure';
import { IStructure, IStructureDetail } from '@organization/classes/response/structure';
import {
  organizationStructureDeleteDispose,
  organizationStructureDeleteRequest,
  organizationStructureGetAllDispose,
  organizationStructureGetAllRequest,
  organizationStructureGetByIdDispose,
  organizationStructureGetByIdRequest,
  organizationStructureGetSubOrdinateListDispose,
  organizationStructureGetSubOrdinateListRequest,
  organizationStructurePostDispose,
  organizationStructurePostRequest,
  organizationStructurePutDispose,
  organizationStructurePutRequest,
} from '@organization/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  organizationStructureState: {
    all: IQueryCollectionState<IOrganizationStructureAllRequest, IStructure>;
    subOrdinateList: IQueryCollectionState<IOrganizationStructureSubOrdinateListRequest, IEmployee>;
    detail: IQuerySingleState<IOrganizationStructureByIdRequest, IStructureDetail>;
  };
}

interface PropsFromDispatch {
  organizationStructureDispatch: {
    // command
    createRequest: typeof organizationStructurePostRequest;
    createDispose: typeof organizationStructurePostDispose;
    updateRequest: typeof organizationStructurePutRequest;
    updateDispose: typeof organizationStructurePutDispose;
    deleteRequest: typeof organizationStructureDeleteRequest;
    deleteDispose: typeof organizationStructureDeleteDispose;

    // query
    loadAllRequest: typeof organizationStructureGetAllRequest;
    loadAllDispose: typeof organizationStructureGetAllDispose;
    loadSubOrdinateListRequest: typeof organizationStructureGetSubOrdinateListRequest;
    loadSubOrdinateListDispose: typeof organizationStructureGetSubOrdinateListDispose;
    loadDetailRequest: typeof organizationStructureGetByIdRequest;
    loadDetailDispose: typeof organizationStructureGetByIdDispose;
  };
}

export interface WithOrganizationStructure extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ organizationStructureGetAll, organizationStructureGetSubOrdinateList, organizationStructureGetById }: IAppState) => ({
  organizationStructureState: {
    all: organizationStructureGetAll,
    subOrdinateList: organizationStructureGetSubOrdinateList,
    detail: organizationStructureGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  organizationStructureDispatch: {
    // command
    createRequest: (request: IOrganizationStructurePostRequest) => dispatch(organizationStructurePostRequest(request)),
    createDispose: () => dispatch(organizationStructurePostDispose()),
    updateRequest: (request: IOrganizationStructurePutRequest) => dispatch(organizationStructurePutRequest(request)),
    updateDispose: () => dispatch(organizationStructurePutDispose()),
    deleteRequest: (request: IOrganizationStructureDeleteRequest) => dispatch(organizationStructureDeleteRequest(request)),
    deleteDispose: () => dispatch(organizationStructureDeleteDispose()),
    
    // query
    loadAllRequest: (request: IOrganizationStructureAllRequest) => dispatch(organizationStructureGetAllRequest(request)),
    loadAllDispose: () => dispatch(organizationStructureGetAllDispose()),
    loadSubOrdinateListRequest: (request: IOrganizationStructureSubOrdinateListRequest) => dispatch(organizationStructureGetSubOrdinateListRequest(request)),
    loadSubOrdinateListDispose: () => dispatch(organizationStructureGetSubOrdinateListDispose()),
    loadDetailRequest: (request: IOrganizationStructureByIdRequest) => dispatch(organizationStructureGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(organizationStructureGetByIdDispose()),
  }
});

export const withOrganizationStructure = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);