import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPITemplateGetAllRequest,
  IKPITemplateGetByIdRequest,
  IKPITemplatePostRequest,
  IKPITemplatePutRequest
} from '@kpi/classes/queries';
import { IKPITemplate, IKPITemplateDetail } from '@kpi/classes/response';
import {
  KPITemplateGetAllDispose,
  KPITemplateGetAllRequest,
  KPITemplateGetByIdDispose,
  KPITemplateGetByIdRequest,
  KPITemplatePostDispose,
  KPITemplatePostRequest,
  KPITemplatePutDispose,
  KPITemplatePutRequest
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
    loadDetailRequest: typeof KPITemplateGetByIdRequest;
    loadDetailDispose: typeof KPITemplateGetByIdDispose;
  };
}

export interface WithKPITemplate extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiTemplateGetAll, kpiTemplateGetById }: IAppState) => ({
  kpiTemplateState: {
    all: kpiTemplateGetAll,
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
    loadDetailRequest: (request: IKPITemplateGetByIdRequest) => dispatch(KPITemplateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPITemplateGetByIdDispose()),
  }
});

export const withKPITemplate = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);