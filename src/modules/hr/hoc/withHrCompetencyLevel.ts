import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyLevelGetAllRequest, 
  IHrCompetencyLevelGetDetailRequest, 
  IHrCompetencyLevelGetListRequest, 
  IHrCompetencyLevelPostRequest, 
  IHrCompetencyLevelPutRequest 
} from '@hr/classes/queries/';
import { IHrCompetencyLevel, IHrCompetencyLevelDetail, IHrCompetencyLevelList } from '@hr/classes/response/';
import { 
  hrCompetencyLevelGetAllDispose, 
  hrCompetencyLevelGetAllRequest, 
  hrCompetencyLevelGetByIdDispose, 
  hrCompetencyLevelGetByIdRequest, 
  hrCompetencyLevelGetListDispose, 
  hrCompetencyLevelGetListRequest, 
  hrCompetencyLevelPostDispose, 
  hrCompetencyLevelPostRequest, 
  hrCompetencyLevelPutDispose,
  hrCompetencyLevelPutRequest 
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyLevelState: {
    all: IQueryCollectionState<IHrCompetencyLevelGetAllRequest, IHrCompetencyLevel>;
    list: IQueryCollectionState<IHrCompetencyLevelGetListRequest, IHrCompetencyLevelList>;
    detail: IQuerySingleState<IHrCompetencyLevelGetDetailRequest, IHrCompetencyLevelDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyLevelDispatch: {
    // command
    createRequest: typeof hrCompetencyLevelPostRequest;
    createDispose: typeof hrCompetencyLevelPostDispose;
    updateRequest: typeof hrCompetencyLevelPutRequest;
    updateDispose: typeof hrCompetencyLevelPutDispose;

    // query
    loadAllRequest: typeof hrCompetencyLevelGetAllRequest;
    loadAllDispose: typeof hrCompetencyLevelGetAllDispose;
    loadListRequest: typeof hrCompetencyLevelGetListRequest;
    loadListDispose: typeof hrCompetencyLevelGetListDispose;
    loadDetailRequest: typeof hrCompetencyLevelGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyLevelGetByIdDispose;
  };
}

export interface WithHrCompetencyLevel extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyLevelGetAll, hrCompetencyLevelGetList, hrCompetencyLevelGetById }: IAppState) => ({
  hrCompetencyLevelState: {
    all: hrCompetencyLevelGetAll,
    list: hrCompetencyLevelGetList,
    detail: hrCompetencyLevelGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyLevelDispatch: {
    // command
    createRequest: (request: IHrCompetencyLevelPostRequest) => dispatch(hrCompetencyLevelPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyLevelPostDispose()),
    updateRequest: (request: IHrCompetencyLevelPutRequest) => dispatch(hrCompetencyLevelPutRequest(request)),
    updateDispose: () => dispatch(hrCompetencyLevelPutDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyLevelGetAllRequest) => dispatch(hrCompetencyLevelGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyLevelGetAllDispose()),
    loadListRequest: (request: IHrCompetencyLevelGetListRequest) => dispatch(hrCompetencyLevelGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyLevelGetListDispose()),
    loadDetailRequest: (request: IHrCompetencyLevelGetDetailRequest) => dispatch(hrCompetencyLevelGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyLevelGetByIdDispose()),
  }
});

export const withHrCompetencyLevel = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);