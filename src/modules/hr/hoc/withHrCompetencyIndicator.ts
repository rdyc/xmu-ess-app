import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyIndicatorGetAllRequest, 
  IHrCompetencyIndicatorGetDetailRequest, 
  IHrCompetencyIndicatorGetListRequest, 
  IHrCompetencyIndicatorPostRequest, 
  IHrCompetencyIndicatorPutRequest 
} from '@hr/classes/queries/';
import { IHrCompetencyIndicator, IHrCompetencyIndicatorDetail, IHrCompetencyIndicatorList } from '@hr/classes/response/';
import { 
  hrCompetencyIndicatorGetAllDispose, 
  hrCompetencyIndicatorGetAllRequest, 
  hrCompetencyIndicatorGetByIdDispose, 
  hrCompetencyIndicatorGetByIdRequest, 
  hrCompetencyIndicatorGetListDispose, 
  hrCompetencyIndicatorGetListRequest, 
  hrCompetencyIndicatorPostDispose, 
  hrCompetencyIndicatorPostRequest, 
  hrCompetencyIndicatorPutDispose, 
  hrCompetencyIndicatorPutRequest 
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyIndicatorState: {
    all: IQueryCollectionState<IHrCompetencyIndicatorGetAllRequest, IHrCompetencyIndicator>;
    list: IQueryCollectionState<IHrCompetencyIndicatorGetListRequest, IHrCompetencyIndicatorList>;
    detail: IQuerySingleState<IHrCompetencyIndicatorGetDetailRequest, IHrCompetencyIndicatorDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyIndicatorDispatch: {
    // command
    createRequest: typeof hrCompetencyIndicatorPostRequest;
    createDispose: typeof hrCompetencyIndicatorPostDispose;
    updateRequest: typeof hrCompetencyIndicatorPutRequest;
    updateDispose: typeof hrCompetencyIndicatorPutDispose;

    // query
    loadAllRequest: typeof hrCompetencyIndicatorGetAllRequest;
    loadAllDispose: typeof hrCompetencyIndicatorGetAllDispose;
    loadListRequest: typeof hrCompetencyIndicatorGetListRequest;
    loadListDispose: typeof hrCompetencyIndicatorGetListDispose;
    loadDetailRequest: typeof hrCompetencyIndicatorGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyIndicatorGetByIdDispose;
  };
}

export interface WithHrCompetencyIndicator extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyIndicatorGetAll, hrCompetencyIndicatorGetList, hrCompetencyIndicatorGetById }: IAppState) => ({
  hrCompetencyIndicatorState: {
    all: hrCompetencyIndicatorGetAll,
    list: hrCompetencyIndicatorGetList,
    detail: hrCompetencyIndicatorGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyIndicatorDispatch: {
    // command
    createRequest: (request: IHrCompetencyIndicatorPostRequest) => dispatch(hrCompetencyIndicatorPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyIndicatorPostDispose()),
    updateRequest: (request: IHrCompetencyIndicatorPutRequest) => dispatch(hrCompetencyIndicatorPutRequest(request)),
    updateDispose: () => dispatch(hrCompetencyIndicatorPutDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyIndicatorGetAllRequest) => dispatch(hrCompetencyIndicatorGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyIndicatorGetAllDispose()),
    loadListRequest: (request: IHrCompetencyIndicatorGetListRequest) => dispatch(hrCompetencyIndicatorGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyIndicatorGetListDispose()),
    loadDetailRequest: (request: IHrCompetencyIndicatorGetDetailRequest) => dispatch(hrCompetencyIndicatorGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyIndicatorGetByIdDispose()),
  }
});

export const withHrCompetencyIndicator = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);