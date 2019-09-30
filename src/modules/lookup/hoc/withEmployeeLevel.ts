import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IEmployeeLevelDeleteRequest, 
  IEmployeeLevelGetAllRequest, 
  IEmployeeLevelGetDetailRequest, 
  IEmployeeLevelGetListRequest, 
  IEmployeeLevelPostRequest, 
  IEmployeeLevelPutRequest 
} from '@lookup/classes/queries';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { 
  lookupEmployeeLevelDeleteDispose, 
  lookupEmployeeLevelDeleteRequest, 
  lookupEmployeeLevelGetAllDispose, 
  lookupEmployeeLevelGetAllRequest, 
  lookupEmployeeLevelGetByIdDispose, 
  lookupEmployeeLevelGetByIdRequest, 
  lookupEmployeeLevelGetListDispose, 
  lookupEmployeeLevelGetListRequest, 
  lookupEmployeeLevelPostDispose, 
  lookupEmployeeLevelPostRequest, 
  lookupEmployeeLevelPutDispose, 
  lookupEmployeeLevelPutRequest 
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupEmployeeLevelState: {
    all: IQueryCollectionState<IEmployeeLevelGetAllRequest, ICompany>;
    list: IQueryCollectionState<IEmployeeLevelGetListRequest, ICompanyList>;
    detail: IQuerySingleState<IEmployeeLevelGetDetailRequest, ICompanyDetail>;
  };
}

interface PropsFromDispatch {
  lookupEmployeeLevelDispatch: {
    // command
    createRequest: typeof lookupEmployeeLevelPostRequest;
    createDispose: typeof lookupEmployeeLevelPostDispose;
    updateRequest: typeof lookupEmployeeLevelPutRequest;
    updateDispose: typeof lookupEmployeeLevelPutDispose;
    deleteRequest: typeof lookupEmployeeLevelDeleteRequest;
    deleteDispose: typeof lookupEmployeeLevelDeleteDispose;

    // query
    loadAllRequest: typeof lookupEmployeeLevelGetAllRequest;
    loadAllDispose: typeof lookupEmployeeLevelGetAllDispose;
    loadListRequest: typeof lookupEmployeeLevelGetListRequest;
    loadListDispose: typeof lookupEmployeeLevelGetListDispose;
    loadDetailRequest: typeof lookupEmployeeLevelGetByIdRequest;
    loadDetailDispose: typeof lookupEmployeeLevelGetByIdDispose;
  };
}

export interface WithEmployeeLevel extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ employeeLevelGetAll, employeeLevelGetList, employeeLevelGetById }: IAppState) => ({
  lookupEmployeeLevelState: {
    all: employeeLevelGetAll,
    list: employeeLevelGetList,
    detail: employeeLevelGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupEmployeeLevelDispatch: {
    // command
    createRequest: (request: IEmployeeLevelPostRequest) => dispatch(lookupEmployeeLevelPostRequest(request)),
    createDispose: () => dispatch(lookupEmployeeLevelPostDispose()),
    updateRequest: (request: IEmployeeLevelPutRequest) => dispatch(lookupEmployeeLevelPutRequest(request)),
    updateDispose: () => dispatch(lookupEmployeeLevelPutDispose()),
    deleteRequest: (request: IEmployeeLevelDeleteRequest) => dispatch(lookupEmployeeLevelDeleteRequest(request)),
    deleteDispose: () => dispatch(lookupEmployeeLevelDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeLevelGetAllRequest) => dispatch(lookupEmployeeLevelGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupEmployeeLevelGetAllDispose()),
    loadListRequest: (request: IEmployeeLevelGetListRequest) => dispatch(lookupEmployeeLevelGetListRequest(request)),
    loadListDispose: () => dispatch(lookupEmployeeLevelGetListDispose()),
    loadDetailRequest: (request: IEmployeeLevelGetDetailRequest) => dispatch(lookupEmployeeLevelGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupEmployeeLevelGetByIdDispose()),
  }
});

export const withEmployeeLevel = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);