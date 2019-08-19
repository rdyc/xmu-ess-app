import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ITemplateDeleteRequest,
  ITemplateGetAllRequest,
  ITemplateGetByIdRequest,
  ITemplateGetListRequest,
  ITemplatePostRequest,
  ITemplatePutRequest,
} from '@hr.notification/classes/queries/template';
import { ITemplate } from '@hr.notification/classes/response';
import {
  templateDeleteDispose,
  templateDeleteRequest,
  templateGetAllDispose,
  templateGetAllRequest,
  templateGetByIdDispose,
  templateGetByIdRequest,
  templateGetListDispose,
  templateGetListRequest,
  templatePostDispose,
  templatePostRequest,
  templatePutDispose,
  templatePutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notifTemplateState: {
    all: IQueryCollectionState<ITemplateGetAllRequest, ITemplate>;
    detail: IQuerySingleState<ITemplateGetByIdRequest, ITemplate>;
  };
}

interface PropsFromDispatch {
  notifTemplateDispatch: {
    // command
    createRequest: typeof templatePostRequest;
    createDispose: typeof templatePostDispose;
    updateRequest: typeof templatePutRequest;
    updateDispose: typeof templatePutDispose;
    deleteRequest: typeof templateDeleteRequest;
    deleteDispose: typeof templateDeleteDispose;

    // query
    loadAllRequest: typeof templateGetAllRequest;
    loadAllDispose: typeof templateGetAllDispose;
    loadListRequest: typeof templateGetListRequest;
    loadListDispose: typeof templateGetListDispose;
    loadDetailRequest: typeof templateGetByIdRequest;
    loadDetailDispose: typeof templateGetByIdDispose;
  };
}

export interface WithTemplate extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ templateGetAll, templateGetList, templateGetById }: IAppState) => ({
  notifTemplateState: {
    all: templateGetAll,
    list: templateGetList,
    detail: templateGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notifTemplateDispatch: {
    // command
    createRequest: (request: ITemplatePostRequest) => dispatch(templatePostRequest(request)),
    createDispose: () => dispatch(templatePostDispose()),
    updateRequest: (request: ITemplatePutRequest) => dispatch(templatePutRequest(request)),
    updateDispose: () => dispatch(templatePutDispose()),
    deleteRequest: (request: ITemplateDeleteRequest) => dispatch(templateDeleteRequest(request)),
    deleteDispose: () => dispatch(templateDeleteDispose()),
    
    // query
    loadAllRequest: (request: ITemplateGetAllRequest) => dispatch(templateGetAllRequest(request)),
    loadAllDispose: () => dispatch(templateGetAllDispose()),
    loadListRequest: (request: ITemplateGetListRequest) => dispatch(templateGetListRequest(request)),
    loadListDispose: () => dispatch(templateGetListDispose()),
    loadDetailRequest: (request: ITemplateGetByIdRequest) => dispatch(templateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(templateGetByIdDispose()),
  }
});

export const withTemplate = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);