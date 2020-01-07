import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { 
  IMarkdownCategoryGetAll, 
  IMarkdownCategoryGetById, 
  IMarkdownCategoryGetList, 
  IMarkdownCategoryPost, 
  IMarkdownCategoryPut 
} from '../classes/queries';
import { IMarkdownCategory, IMarkdownCategoryDetail } from '../classes/response';
import { 
  markdownCategoryGetAllDispose, 
  markdownCategoryGetAllRequest, 
  markdownCategoryGetByIdDispose, 
  markdownCategoryGetByIdRequest, 
  markdownCategoryGetListDispose, 
  markdownCategoryGetListRequest, 
  markdownCategoryPostDispose, 
  markdownCategoryPostRequest, 
  markdownCategoryPutDispose,
  markdownCategoryPutRequest
} from '../store/actions';

interface PropsFromState {
  markdownCategoryState: {
    all: IQueryCollectionState<IMarkdownCategoryGetAll, IMarkdownCategory>;
    list: IQueryCollectionState<IMarkdownCategoryGetList, IMarkdownCategory>;
    detail: IQuerySingleState<IMarkdownCategoryGetById, IMarkdownCategoryDetail>;
  };
}

interface PropsFromDispatch {
  markdownCategoryDispatch: {
    // command
    createRequest: typeof markdownCategoryPostRequest;
    createDispose: typeof markdownCategoryPostDispose;
    updateRequest: typeof markdownCategoryPutRequest;
    updateDispose: typeof markdownCategoryPutDispose;

    // query
    loadAllRequest: typeof markdownCategoryGetAllRequest;
    loadAllDispose: typeof markdownCategoryGetAllDispose;
    loadListRequest: typeof markdownCategoryGetListRequest;
    loadListDispose: typeof markdownCategoryGetListDispose;
    loadDetailRequest: typeof markdownCategoryGetByIdRequest;
    loadDetailDispose: typeof markdownCategoryGetByIdDispose;
  };
}

export interface WithMarkdownCategory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ markdownCategoryGetAll, markdownCategoryGetById, markdownCategoryGetList }: IAppState) => ({
  markdownCategoryState: {
    all: markdownCategoryGetAll,
    list: markdownCategoryGetList,
    detail: markdownCategoryGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  markdownCategoryDispatch: {
    // command
    createRequest: (request: IMarkdownCategoryPost) => dispatch(markdownCategoryPostRequest(request)),
    createDispose: () => dispatch(markdownCategoryPostDispose()),
    updateRequest: (request: IMarkdownCategoryPut) => dispatch(markdownCategoryPutRequest(request)),
    updateDispose: () => dispatch(markdownCategoryPutDispose()),

    // query
    loadAllRequest: (request: IMarkdownCategoryGetAll) => dispatch(markdownCategoryGetAllRequest(request)),
    loadAllDispose: () => dispatch(markdownCategoryGetAllDispose()),
    loadListRequest: (request: IMarkdownCategoryGetList) => dispatch(markdownCategoryGetListRequest(request)),
    loadListDispose: () => dispatch(markdownCategoryGetListDispose()),
    loadDetailRequest: (request: IMarkdownCategoryGetById) => dispatch(markdownCategoryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(markdownCategoryGetByIdDispose()),
  }
});

export const withMarkdownCategory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);