import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ILookupCompanyGetAllRequest, ILookupCompanyGetDetailRequest, ILookupCompanyGetListRequest } from '@lookup/classes/queries/company';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { lookupCompanyGetAllDispose, lookupCompanyGetAllRequest, lookupCompanyGetByIdDispose, lookupCompanyGetByIdRequest, lookupCompanyGetListDispose, lookupCompanyGetListRequest } from '@lookup/store/actions';
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