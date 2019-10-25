import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyClusterGetAllRequest, 
  IHrCompetencyClusterGetDetailRequest, 
  IHrCompetencyClusterGetListRequest, 
  IHrCompetencyClusterPatchRequest, 
  IHrCompetencyClusterPostRequest,
} from '@hr/classes/queries/';
import { IHrCompetencyCluster, IHrCompetencyClusterDetail, IHrCompetencyClusterList } from '@hr/classes/response/';
import { 
  hrCompetencyClusterGetAllDispose, 
  hrCompetencyClusterGetAllRequest, 
  hrCompetencyClusterGetByIdDispose, 
  hrCompetencyClusterGetByIdRequest, 
  hrCompetencyClusterGetListDispose, 
  hrCompetencyClusterGetListRequest, 
  hrCompetencyClusterPatchDispose, 
  hrCompetencyClusterPatchRequest, 
  hrCompetencyClusterPostDispose, 
  hrCompetencyClusterPostRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyClusterState: {
    all: IQueryCollectionState<IHrCompetencyClusterGetAllRequest, IHrCompetencyCluster>;
    list: IQueryCollectionState<IHrCompetencyClusterGetListRequest, IHrCompetencyClusterList>;
    detail: IQuerySingleState<IHrCompetencyClusterGetDetailRequest, IHrCompetencyClusterDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyClusterDispatch: {
    // command
    createRequest: typeof hrCompetencyClusterPostRequest;
    createDispose: typeof hrCompetencyClusterPostDispose;
    patchRequest: typeof hrCompetencyClusterPatchRequest;
    patchDispose: typeof hrCompetencyClusterPatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyClusterGetAllRequest;
    loadAllDispose: typeof hrCompetencyClusterGetAllDispose;
    loadListRequest: typeof hrCompetencyClusterGetListRequest;
    loadListDispose: typeof hrCompetencyClusterGetListDispose;
    loadDetailRequest: typeof hrCompetencyClusterGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyClusterGetByIdDispose;
  };
}

export interface WithHrCompetencyCluster extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyClusterGetAll, hrCompetencyClusterGetList, hrCompetencyClusterGetById }: IAppState) => ({
  hrCompetencyClusterState: {
    all: hrCompetencyClusterGetAll,
    list: hrCompetencyClusterGetList,
    detail: hrCompetencyClusterGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyClusterDispatch: {
    // command
    createRequest: (request: IHrCompetencyClusterPostRequest) => dispatch(hrCompetencyClusterPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyClusterPostDispose()),
    patchRequest: (request: IHrCompetencyClusterPatchRequest) => dispatch(hrCompetencyClusterPatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyClusterPatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyClusterGetAllRequest) => dispatch(hrCompetencyClusterGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyClusterGetAllDispose()),
    loadListRequest: (request: IHrCompetencyClusterGetListRequest) => dispatch(hrCompetencyClusterGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyClusterGetListDispose()),
    loadDetailRequest: (request: IHrCompetencyClusterGetDetailRequest) => dispatch(hrCompetencyClusterGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyClusterGetByIdDispose()),
  }
});

export const withHrCompetencyCluster = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);