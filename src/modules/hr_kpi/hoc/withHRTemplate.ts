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
} from '@KPI/classes/queries';
import { IKPITemplate, IKPITemplateDetail } from '@KPI/classes/response';
import {
  KPITemplateGetAllDispose,
  KPITemplateGetAllRequest,
  KPITemplateGetByIdDispose,
  KPITemplateGetByIdRequest,
  KPITemplatePostDispose,
  KPITemplatePostRequest,
  KPITemplatePutDispose,
  KPITemplatePutRequest
} from '@KPI/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  KPITemplateState: {
    all: IQueryCollectionState<IKPITemplateGetAllRequest, IKPITemplate>;
    detail: IQuerySingleState<IKPITemplateGetByIdRequest, IKPITemplateDetail>;
  };
}

interface PropsFromDispatch {
  KPITemplateDispatch: {
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

const mapStateToProps = ({ KPITemplateGetAll, KPITemplateGetById }: IAppState) => ({
  KPITemplateState: {
    all: KPITemplateGetAll,
    detail: KPITemplateGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  KPITemplateDispatch: {
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