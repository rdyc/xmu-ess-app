import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  ILookupCompanyDeleteRequest, 
  ILookupCompanyGetAllRequest, 
  ILookupCompanyGetDetailRequest, 
  ILookupCompanyGetListRequest, 
  ILookupCompanyPostRequest, 
  ILookupCompanyPutRequest 
} from '@lookup/classes/queries/company';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { 
  lookupCompanyDeleteDispose, 
  lookupCompanyDeleteRequest, 
  lookupCompanyGetAllDispose, 
  lookupCompanyGetAllRequest, 
  lookupCompanyGetByIdDispose, 
  lookupCompanyGetByIdRequest, 
  lookupCompanyGetListDispose, 
  lookupCompanyGetListRequest, 
  lookupCompanyPostDispose, 
  lookupCompanyPostRequest, 
  lookupCompanyPutDispose, 
  lookupCompanyPutRequest 
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupCompanyState: {
    all: IQueryCollectionState<ILookupCompanyGetAllRequest, ICompany>;
    list: IQueryCollectionState<ILookupCompanyGetListRequest, ICompanyList>;
    detail: IQuerySingleState<ILookupCompanyGetDetailRequest, ICompanyDetail>;
  };
}

interface PropsFromDispatch {
  lookupCompanyDispatch: {
    // command
    createRequest: typeof lookupCompanyPostRequest;
    createDispose: typeof lookupCompanyPostDispose;
    updateRequest: typeof lookupCompanyPutRequest;
    updateDispose: typeof lookupCompanyPutDispose;
    deleteRequest: typeof lookupCompanyDeleteRequest;
    deleteDispose: typeof lookupCompanyDeleteDispose;

    // query
    loadAllRequest: typeof lookupCompanyGetAllRequest;
    loadAllDispose: typeof lookupCompanyGetAllDispose;
    loadListRequest: typeof lookupCompanyGetListRequest;
    loadListDispose: typeof lookupCompanyGetListDispose;
    loadDetailRequest: typeof lookupCompanyGetByIdRequest;
    loadDetailDispose: typeof lookupCompanyGetByIdDispose;
  };
}

export interface WithLookupCompany extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupCompanyGetAll, lookupCompanyGetList, lookupCompanyGetById }: IAppState) => ({
  lookupCompanyState: {
    all: lookupCompanyGetAll,
    list: lookupCompanyGetList,
    detail: lookupCompanyGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupCompanyDispatch: {
    // command
    createRequest: (request: ILookupCompanyPostRequest) => dispatch(lookupCompanyPostRequest(request)),
    createDispose: () => dispatch(lookupCompanyPostDispose()),
    updateRequest: (request: ILookupCompanyPutRequest) => dispatch(lookupCompanyPutRequest(request)),
    updateDispose: () => dispatch(lookupCompanyPutDispose()),
    deleteRequest: (request: ILookupCompanyDeleteRequest) => dispatch(lookupCompanyDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupCompanyDeleteDispose()),

    // query
    loadAllRequest: (request: ILookupCompanyGetAllRequest) => dispatch(lookupCompanyGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupCompanyGetAllDispose()),
    loadListRequest: (request: ILookupCompanyGetListRequest) => dispatch(lookupCompanyGetListRequest(request)),
    loadListDispose: () => dispatch(lookupCompanyGetListDispose()),
    loadDetailRequest: (request: ILookupCompanyGetDetailRequest) => dispatch(lookupCompanyGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupCompanyGetByIdDispose()),
  }
});

export const withLookupCompany = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);