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
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCornerBlogState: {
    all: IQueryCollectionState<IHrCornerBlogGetAllRequest, IHrCornerBlog>;
    allByCategory: IQueryCollectionState<IHrCornerBlogGetAllByCategoryRequest, IHrCornerBlogCategory>;
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
    loadDetailRequest: typeof hrCornerBlogGetByIdRequest;
    loadDetailDispose: typeof hrCornerBlogGetByIdDispose;
  };
}

export interface WithHrCornerBlog extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCornerBlogGetAll, hrCornerBlogGetAllByCategory, hrCornerBlogGetDetail }: IAppState) => ({
  hrCornerBlogState: {
    all: hrCornerBlogGetAll,
    allByCategory: hrCornerBlogGetAllByCategory,
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
    loadDetailRequest: (request: IHrCornerBlogGetDetailRequest) => dispatch(hrCornerBlogGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCornerBlogGetByIdDispose()),
  }
});

export const withHrCornerBlog = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);