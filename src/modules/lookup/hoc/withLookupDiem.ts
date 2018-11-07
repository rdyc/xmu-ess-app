import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IDiemAllRequest, IDiemByIdRequest, IDiemListRequest } from '@lookup/classes/queries';
import { IDiem, IDiemDetail, IDiemList } from '@lookup/classes/response';
import { diemGetAllDispose, diemGetAllRequest, diemGetByIdDispose, diemGetByIdRequest, diemGetListDispose, diemGetListRequest } from '@lookup/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  lookupDiemState: {
    all: IQueryCollectionState<IDiemAllRequest, IDiem>;
    list: IQueryCollectionState<IDiemListRequest, IDiemList>;
    detail: IQuerySingleState<IDiemByIdRequest, IDiemDetail>;
  };
}

interface PropsFromDispatch {
  lookupDiemDispatch: {
    loadAllRequest: typeof diemGetAllRequest;
    loadAllDispose: typeof diemGetAllDispose;
    loadListRequest: typeof diemGetListRequest;
    loadListDispose: typeof diemGetListDispose;
    loadDetailRequest: typeof diemGetByIdRequest;
    loadDetailDispose: typeof diemGetByIdDispose;
  };
}

export interface WithLookupDiem extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ diemGetAll, diemGetList, diemGetById }: IAppState) => ({
  lookupDiemState: {
    all: diemGetAll,
    list: diemGetList,
    detail: diemGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  lookupDiemDispatch: {
    // query
    loadAllRequest: (request: IDiemAllRequest) => dispatch(diemGetAllRequest(request)),
    loadAllDispose: () => dispatch(diemGetAllDispose()),
    loadListRequest: (request: IDiemListRequest) => dispatch(diemGetListRequest(request)),
    loadListDispose: () => dispatch(diemGetListDispose()),
    loadDetailRequest: (request: IDiemByIdRequest) => dispatch(diemGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(diemGetByIdDispose()),
  }
});

export const withLookupDiem = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);