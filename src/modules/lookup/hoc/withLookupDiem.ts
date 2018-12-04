import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ILookupDiemAllRequest, ILookupDiemDetailRequest, ILookupDiemListRequest } from '@lookup/classes/queries/diem';
import { ILookupDiemPostRequest } from '@lookup/classes/queries/diem/ILookupDiemPostRequest';
import { ILookupDiemPutRequest } from '@lookup/classes/queries/diem/ILookupDiemPutRequest';
import { IDiem, IDiemDetail, IDiemList } from '@lookup/classes/response';
import { 
  lookupDiemGetAllDispose, 
  lookupDiemGetAllRequest, 
  lookupDiemGetByIdDispose, 
  lookupDiemGetByIdRequest, 
  lookupDiemGetListDispose, 
  lookupDiemGetListRequest, 
  lookupDiemPostDispose, 
  lookupDiemPostRequest, 
  lookupDiemPutDispose, 
  lookupDiemPutRequest 
} from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupDiemState: {
    all: IQueryCollectionState<ILookupDiemAllRequest, IDiem>;
    list: IQueryCollectionState<ILookupDiemListRequest, IDiemList>;
    detail: IQuerySingleState<ILookupDiemDetailRequest, IDiemDetail>;
  };
}

interface PropsFromDispatch {
  lookupDiemDispatch: {
    // command
    createRequest: typeof lookupDiemPostRequest;
    createDispose: typeof lookupDiemPostDispose;
    updateRequest: typeof lookupDiemPutRequest;
    updateDispose: typeof lookupDiemPutDispose;

    // query
    loadAllRequest: typeof lookupDiemGetAllRequest;
    loadAllDispose: typeof lookupDiemGetAllDispose;
    loadListRequest: typeof lookupDiemGetListRequest;
    loadListDispose: typeof lookupDiemGetListDispose;
    loadDetailRequest: typeof lookupDiemGetByIdRequest;
    loadDetailDispose: typeof lookupDiemGetByIdDispose;
  };
}

export interface WithLookupDiem extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupDiemGetAll, lookupDiemGetList, lookupDiemGetById }: IAppState) => ({
  lookupDiemState: {
    all: lookupDiemGetAll,
    list: lookupDiemGetList,
    detail: lookupDiemGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupDiemDispatch: {
    // command
    createRequest: (request: ILookupDiemPostRequest) => dispatch(lookupDiemPostRequest(request)),
    createDispose: () => dispatch(lookupDiemPostDispose()),
    updateRequest: (request: ILookupDiemPutRequest) => dispatch(lookupDiemPutRequest(request)),
    updateDispose: () => dispatch(lookupDiemPutDispose()),
    
    // query
    loadAllRequest: (request: ILookupDiemAllRequest) => dispatch(lookupDiemGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupDiemGetAllDispose()),
    loadListRequest: (request: ILookupDiemListRequest) => dispatch(lookupDiemGetListRequest(request)),
    loadListDispose: () => dispatch(lookupDiemGetListDispose()),
    loadDetailRequest: (request: ILookupDiemDetailRequest) => dispatch(lookupDiemGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(lookupDiemGetByIdDispose()),
  }
});

export const withLookupDiem = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);