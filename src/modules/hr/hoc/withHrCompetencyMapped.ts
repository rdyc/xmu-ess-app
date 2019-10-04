import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyMappedGetAllRequest, 
  IHrCompetencyMappedGetDetailRequest, 
  IHrCompetencyMappedGetListRequest, 
  IHrCompetencyMappedGetNextRequest, 
  IHrCompetencyMappedPostRequest, 
  IHrCompetencyMappedPutRequest
} from '@hr/classes/queries/';
import { IHrCompetencyMapped, IHrCompetencyMappedDetail, IHrCompetencyMappedList, IHrCompetencyMappedNext } from '@hr/classes/response/';
import { 
  hrCompetencyMappedGetAllDispose, 
  hrCompetencyMappedGetAllRequest, 
  hrCompetencyMappedGetByIdDispose, 
  hrCompetencyMappedGetByIdRequest, 
  hrCompetencyMappedGetListDispose, 
  hrCompetencyMappedGetListRequest, 
  hrCompetencyMappedGetNextDispose, 
  hrCompetencyMappedGetNextRequest, 
  hrCompetencyMappedPostDispose, 
  hrCompetencyMappedPostRequest, 
  hrCompetencyMappedPutDispose,
  hrCompetencyMappedPutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyMappedState: {
    all: IQueryCollectionState<IHrCompetencyMappedGetAllRequest, IHrCompetencyMapped>;
    list: IQueryCollectionState<IHrCompetencyMappedGetListRequest, IHrCompetencyMappedList>;
    detail: IQuerySingleState<IHrCompetencyMappedGetDetailRequest, IHrCompetencyMappedDetail>;
    next: IQueryCollectionState<IHrCompetencyMappedGetNextRequest, IHrCompetencyMappedNext>;
  };
}

interface PropsFromDispatch {
  hrCompetencyMappedDispatch: {
    // command
    createRequest: typeof hrCompetencyMappedPostRequest;
    createDispose: typeof hrCompetencyMappedPostDispose;
    updateRequest: typeof hrCompetencyMappedPutRequest;
    updateDispose: typeof hrCompetencyMappedPutDispose;

    // query
    loadAllRequest: typeof hrCompetencyMappedGetAllRequest;
    loadAllDispose: typeof hrCompetencyMappedGetAllDispose;
    loadListRequest: typeof hrCompetencyMappedGetListRequest;
    loadListDispose: typeof hrCompetencyMappedGetListDispose;
    loadNextRequest: typeof hrCompetencyMappedGetNextRequest;
    loadNextDispose: typeof hrCompetencyMappedGetNextDispose;
    loadDetailRequest: typeof hrCompetencyMappedGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyMappedGetByIdDispose;
  };
}

export interface WithHrCompetencyMapped extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyMappedGetAll, hrCompetencyMappedGetList, hrCompetencyMappedGetById, hrCompetencyMappedGetNext }: IAppState) => ({
  hrCompetencyMappedState: {
    all: hrCompetencyMappedGetAll,
    list: hrCompetencyMappedGetList,
    detail: hrCompetencyMappedGetById,
    next: hrCompetencyMappedGetNext
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyMappedDispatch: {
    // command
    createRequest: (request: IHrCompetencyMappedPostRequest) => dispatch(hrCompetencyMappedPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyMappedPostDispose()),
    updateRequest: (request: IHrCompetencyMappedPutRequest) => dispatch(hrCompetencyMappedPutRequest(request)),
    updateDispose: () => dispatch(hrCompetencyMappedPutDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyMappedGetAllRequest) => dispatch(hrCompetencyMappedGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyMappedGetAllDispose()),
    loadListRequest: (request: IHrCompetencyMappedGetListRequest) => dispatch(hrCompetencyMappedGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyMappedGetListDispose()),
    loadNextRequest: (request: IHrCompetencyMappedGetNextRequest) => dispatch(hrCompetencyMappedGetNextRequest(request)),
    loadNextDispose: () => dispatch(hrCompetencyMappedGetNextDispose()),
    loadDetailRequest: (request: IHrCompetencyMappedGetDetailRequest) => dispatch(hrCompetencyMappedGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyMappedGetByIdDispose()),
  }
});

export const withHrCompetencyMapped = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);