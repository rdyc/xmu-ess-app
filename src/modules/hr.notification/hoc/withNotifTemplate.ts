import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  INotifTemplateDeleteRequest,
  INotifTemplateGetAllRequest,
  INotifTemplateGetByIdRequest,
  INotifTemplateGetListRequest,
  INotifTemplatePostRequest,
  INotifTemplatePutRequest,
} from '@hr.notification/classes/queries/template';
import { INotifTemplate } from '@hr.notification/classes/response';
import {
  notifTemplateDeleteDispose,
  notifTemplateDeleteRequest,
  notifTemplateGetAllDispose,
  notifTemplateGetAllRequest,
  notifTemplateGetByIdDispose,
  notifTemplateGetByIdRequest,
  notifTemplateGetListDispose,
  notifTemplateGetListRequest,
  notifTemplatePostDispose,
  notifTemplatePostRequest,
  notifTemplatePutDispose,
  notifTemplatePutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notifTemplateState: {
    all: IQueryCollectionState<INotifTemplateGetAllRequest, INotifTemplate>;
    detail: IQuerySingleState<INotifTemplateGetByIdRequest, INotifTemplate>;
  };
}

interface PropsFromDispatch {
  notifTemplateDispatch: {
    // command
    createRequest: typeof notifTemplatePostRequest;
    createDispose: typeof notifTemplatePostDispose;
    updateRequest: typeof notifTemplatePutRequest;
    updateDispose: typeof notifTemplatePutDispose;
    deleteRequest: typeof notifTemplateDeleteRequest;
    deleteDispose: typeof notifTemplateDeleteDispose;

    // query
    loadAllRequest: typeof notifTemplateGetAllRequest;
    loadAllDispose: typeof notifTemplateGetAllDispose;
    loadListRequest: typeof notifTemplateGetListRequest;
    loadListDispose: typeof notifTemplateGetListDispose;
    loadDetailRequest: typeof notifTemplateGetByIdRequest;
    loadDetailDispose: typeof notifTemplateGetByIdDispose;
  };
}

export interface WithNotifTemplate extends PropsFromState, PropsFromDispatch {}

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
    createRequest: (request: INotifTemplatePostRequest) => dispatch(notifTemplatePostRequest(request)),
    createDispose: () => dispatch(notifTemplatePostDispose()),
    updateRequest: (request: INotifTemplatePutRequest) => dispatch(notifTemplatePutRequest(request)),
    updateDispose: () => dispatch(notifTemplatePutDispose()),
    deleteRequest: (request: INotifTemplateDeleteRequest) => dispatch(notifTemplateDeleteRequest(request)),
    deleteDispose: () => dispatch(notifTemplateDeleteDispose()),
    
    // query
    loadAllRequest: (request: INotifTemplateGetAllRequest) => dispatch(notifTemplateGetAllRequest(request)),
    loadAllDispose: () => dispatch(notifTemplateGetAllDispose()),
    loadListRequest: (request: INotifTemplateGetListRequest) => dispatch(notifTemplateGetListRequest(request)),
    loadListDispose: () => dispatch(notifTemplateGetListDispose()),
    loadDetailRequest: (request: INotifTemplateGetByIdRequest) => dispatch(notifTemplateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(notifTemplateGetByIdDispose()),
  }
});

export const withNotifTemplate = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);