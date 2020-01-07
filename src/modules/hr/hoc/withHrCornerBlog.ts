import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCornerBlogGetAllByCategoryRequest,
  IHrCornerBlogGetAllRequest, 
  IHrCornerBlogGetDetailRequest, 
} from '@hr/classes/queries/';
import { IHrCornerBlog, IHrCornerBlogCategory, IHrCornerBlogDetail } from '@hr/classes/response/';
import { 
  hrCornerBlogGetAllByCategoryDispose, 
  hrCornerBlogGetAllByCategoryRequest, 
  hrCornerBlogGetAllDispose, 
  hrCornerBlogGetAllRequest, 
  hrCornerBlogGetByIdDispose, 
  hrCornerBlogGetByIdRequest,
  hrCornerBlogGetLatestByCategoryDispose,
  hrCornerBlogGetLatestByCategoryRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCornerBlogState: {
    all: IQueryCollectionState<IHrCornerBlogGetAllRequest, IHrCornerBlog>;
    allByCategory: IQueryCollectionState<IHrCornerBlogGetAllByCategoryRequest, IHrCornerBlogCategory>;
    latestByCategory: IQueryCollectionState<IHrCornerBlogGetAllByCategoryRequest, IHrCornerBlogCategory>;
    detail: IQuerySingleState<IHrCornerBlogGetDetailRequest, IHrCornerBlogDetail>;
  };
}

interface PropsFromDispatch {
  hrCornerBlogDispatch: {
    // query
    loadAllRequest: typeof hrCornerBlogGetAllRequest;
    loadAllDispose: typeof hrCornerBlogGetAllDispose;
    loadAllByCategoryRequest: typeof hrCornerBlogGetAllByCategoryRequest;
    loadAllByCategoryDispose: typeof hrCornerBlogGetAllByCategoryDispose;
    loadLatestByCategoryRequest: typeof hrCornerBlogGetLatestByCategoryRequest;
    loadLatestByCategoryDispose: typeof hrCornerBlogGetLatestByCategoryDispose;
    loadDetailRequest: typeof hrCornerBlogGetByIdRequest;
    loadDetailDispose: typeof hrCornerBlogGetByIdDispose;
  };
}

export interface WithHrCornerBlog extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCornerBlogGetAll, hrCornerBlogGetAllByCategory, hrCornerBlogGetDetail, hrCornerBlogGetLatestByCategory }: IAppState) => ({
  hrCornerBlogState: {
    all: hrCornerBlogGetAll,
    allByCategory: hrCornerBlogGetAllByCategory,
    latestByCategory: hrCornerBlogGetLatestByCategory,
    detail: hrCornerBlogGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCornerBlogDispatch: {
    // query
    loadAllRequest: (request: IHrCornerBlogGetAllRequest) => dispatch(hrCornerBlogGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCornerBlogGetAllDispose()),
    loadAllByCategoryRequest: (request: IHrCornerBlogGetAllByCategoryRequest) => dispatch(hrCornerBlogGetAllByCategoryRequest(request)),
    loadAllByCategoryDispose: () => dispatch(hrCornerBlogGetAllByCategoryDispose()),
    loadLatestByCategoryRequest: (request: IHrCornerBlogGetAllByCategoryRequest) => dispatch(hrCornerBlogGetLatestByCategoryRequest(request)),
    loadLatestByCategoryDispose: () => dispatch(hrCornerBlogGetLatestByCategoryDispose()),
    loadDetailRequest: (request: IHrCornerBlogGetDetailRequest) => dispatch(hrCornerBlogGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCornerBlogGetByIdDispose()),
  }
});

export const withHrCornerBlog = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);