import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCornerPageDeleteRequest, 
  IHrCornerPageGetAllRequest, 
  IHrCornerPageGetDetailRequest,
  IHrCornerPagePostRequest, 
  IHrCornerPagePutRequest
} from '@hr/classes/queries/';
import { IHrCornerPage, IHrCornerPageDetail } from '@hr/classes/response/';
import { 
  hrCornerPageDeleteDispose, 
  hrCornerPageDeleteRequest, 
  hrCornerPageGetAllDispose, 
  hrCornerPageGetAllRequest, 
  hrCornerPageGetByIdDispose, 
  hrCornerPageGetByIdRequest, 
  hrCornerPagePostDispose, 
  hrCornerPagePostRequest, 
  hrCornerPagePutDispose,
  hrCornerPagePutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCornerPageState: {
    all: IQueryCollectionState<IHrCornerPageGetAllRequest, IHrCornerPage>;
    detail: IQuerySingleState<IHrCornerPageGetDetailRequest, IHrCornerPageDetail>;
  };
}

interface PropsFromDispatch {
  hrCornerPageDispatch: {
    // command
    createRequest: typeof hrCornerPagePostRequest;
    createDispose: typeof hrCornerPagePostDispose;
    updateRequest: typeof hrCornerPagePutRequest;
    updateDispose: typeof hrCornerPagePutDispose;
    deleteRequest: typeof hrCornerPageDeleteRequest;
    deleteDispose: typeof hrCornerPageDeleteDispose;

    // query
    loadAllRequest: typeof hrCornerPageGetAllRequest;
    loadAllDispose: typeof hrCornerPageGetAllDispose;
    loadDetailRequest: typeof hrCornerPageGetByIdRequest;
    loadDetailDispose: typeof hrCornerPageGetByIdDispose;
  };
}

export interface WithHrCornerPage extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCornerPageGetAll, hrCornerPageGetDetail }: IAppState) => ({
  hrCornerPageState: {
    all: hrCornerPageGetAll,
    detail: hrCornerPageGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCornerPageDispatch: {
    // command
    createRequest: (request: IHrCornerPagePostRequest) => dispatch(hrCornerPagePostRequest(request)),
    createDispose: () => dispatch(hrCornerPagePostDispose()),
    updateRequest: (request: IHrCornerPagePutRequest) => dispatch(hrCornerPagePutRequest(request)),
    updateDispose: () => dispatch(hrCornerPagePutDispose()),
    deleteRequest: (request: IHrCornerPageDeleteRequest) => dispatch(hrCornerPageDeleteRequest(request)),
    deleteDispose: () => dispatch(hrCornerPageDeleteDispose()),

    // query
    loadAllRequest: (request: IHrCornerPageGetAllRequest) => dispatch(hrCornerPageGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCornerPageGetAllDispose()),
    loadDetailRequest: (request: IHrCornerPageGetDetailRequest) => dispatch(hrCornerPageGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCornerPageGetByIdDispose()),
  }
});

export const withHrCornerPage = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);