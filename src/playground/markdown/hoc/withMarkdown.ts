import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IMarkdownGetAll, IMarkdownGetById, IMarkdownPost, IMarkdownPut } from '../classes/queries';
import { IMarkdown, IMarkdownDetail } from '../classes/response';
import { 
  markdownGetAllDispose, 
  markdownGetAllRequest, 
  markdownGetByIdDispose, 
  markdownGetByIdRequest, 
  markdownPostDispose, 
  markdownPostRequest, 
  markdownPutDispose, 
  markdownPutRequest 
} from '../store/actions';

interface PropsFromState {
  markdownState: {
    all: IQueryCollectionState<IMarkdownGetAll, IMarkdown>;
    detail: IQuerySingleState<IMarkdownGetById, IMarkdownDetail>;
  };
}

interface PropsFromDispatch {
  markdownDispatch: {
    // command
    createRequest: typeof markdownPostRequest;
    createDispose: typeof markdownPostDispose;
    updateRequest: typeof markdownPutRequest;
    updateDispose: typeof markdownPutDispose;

    // query
    loadAllRequest: typeof markdownGetAllRequest;
    loadAllDispose: typeof markdownGetAllDispose;
    loadDetailRequest: typeof markdownGetByIdRequest;
    loadDetailDispose: typeof markdownGetByIdDispose;
  };
}

export interface WithMarkdown extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ markdownGetAll, markdownGetById }: IAppState) => ({
  markdownState: {
    all: markdownGetAll,
    detail: markdownGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  markdownDispatch: {
    // command
    createRequest: (request: IMarkdownPost) => dispatch(markdownPostRequest(request)),
    createDispose: () => dispatch(markdownPostDispose()),
    updateRequest: (request: IMarkdownPut) => dispatch(markdownPutRequest(request)),
    updateDispose: () => dispatch(markdownPutDispose()),

    // query
    loadAllRequest: (request: IMarkdownGetAll) => dispatch(markdownGetAllRequest(request)),
    loadAllDispose: () => dispatch(markdownGetAllDispose()),
    loadDetailRequest: (request: IMarkdownGetById) => dispatch(markdownGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(markdownGetByIdDispose()),
  }
});

export const withMarkdown = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);