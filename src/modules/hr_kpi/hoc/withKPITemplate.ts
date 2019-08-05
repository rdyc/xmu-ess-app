import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPITemplateGetAllRequest,
  IKPITemplateGetByIdRequest,
  IKPITemplateGetListRequest,
  IKPITemplatePostRequest,
  IKPITemplatePutRequest,
} from '@kpi/classes/queries';
import { IKPITemplate, IKPITemplateDetail } from '@kpi/classes/response';
import {
  KPITemplateGetAllDispose,
  KPITemplateGetAllRequest,
  KPITemplateGetByIdDispose,
  KPITemplateGetByIdRequest,
  KPITemplateGetListDispose,
  KPITemplateGetListRequest,
  KPITemplatePostDispose,
  KPITemplatePostRequest,
  KPITemplatePutDispose,
  KPITemplatePutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiTemplateState: {
    all: IQueryCollectionState<IKPITemplateGetAllRequest, IKPITemplate>;
    detail: IQuerySingleState<IKPITemplateGetByIdRequest, IKPITemplateDetail>;
  };
}

interface PropsFromDispatch {
  kpiTemplateDispatch: {
    // command
    createRequest: typeof KPITemplatePostRequest;
    createDispose: typeof KPITemplatePostDispose;
    updateRequest: typeof KPITemplatePutRequest;
    updateDispose: typeof KPITemplatePutDispose;

    // query
    loadAllRequest: typeof KPITemplateGetAllRequest;
    loadAllDispose: typeof KPITemplateGetAllDispose;
    loadListRequest: typeof KPITemplateGetListRequest;
    loadListDispose: typeof KPITemplateGetListDispose;
    loadDetailRequest: typeof KPITemplateGetByIdRequest;
    loadDetailDispose: typeof KPITemplateGetByIdDispose;
  };
}

export interface WithKPITemplate extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiTemplateGetAll, kpiTemplateGetList, kpiTemplateGetById }: IAppState) => ({
  kpiTemplateState: {
    all: kpiTemplateGetAll,
    list: kpiTemplateGetList,
    detail: kpiTemplateGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiTemplateDispatch: {
    // command
    createRequest: (request: IKPITemplatePostRequest) => dispatch(KPITemplatePostRequest(request)),
    createDispose: () => dispatch(KPITemplatePostDispose()),
    updateRequest: (request: IKPITemplatePutRequest) => dispatch(KPITemplatePutRequest(request)),
    updateDispose: () => dispatch(KPITemplatePutDispose()),
    
    // query
    loadAllRequest: (request: IKPITemplateGetAllRequest) => dispatch(KPITemplateGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPITemplateGetAllDispose()),
    loadListRequest: (request: IKPITemplateGetListRequest) => dispatch(KPITemplateGetListRequest(request)),
    loadListDispose: () => dispatch(KPITemplateGetListDispose()),
    loadDetailRequest: (request: IKPITemplateGetByIdRequest) => dispatch(KPITemplateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPITemplateGetByIdDispose()),
  }
});

export const withKPITemplate = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);