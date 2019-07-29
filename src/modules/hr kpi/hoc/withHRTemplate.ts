import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IHRTemplateGetAllRequest,
  IHRTemplateGetByIdRequest,
  IHRTemplatePostRequest,
  IHRTemplatePutRequest
} from '@hr/classes/queries';
import { IHRTemplate, IHRTemplateDetail } from '@hr/classes/response';
import {
  hrTemplateGetAllDispose,
  hrTemplateGetAllRequest,
  hrTemplateGetByIdDispose,
  hrTemplateGetByIdRequest,
  hrTemplatePostDispose,
  hrTemplatePostRequest,
  hrTemplatePutDispose,
  hrTemplatePutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrTemplateState: {
    all: IQueryCollectionState<IHRTemplateGetAllRequest, IHRTemplate>;
    detail: IQuerySingleState<IHRTemplateGetByIdRequest, IHRTemplateDetail>;
  };
}

interface PropsFromDispatch {
  hrTemplateDispatch: {
    // command
    createRequest: typeof hrTemplatePostRequest;
    createDispose: typeof hrTemplatePostDispose;
    updateRequest: typeof hrTemplatePutRequest;
    updateDispose: typeof hrTemplatePutDispose;

    // query
    loadAllRequest: typeof hrTemplateGetAllRequest;
    loadAllDispose: typeof hrTemplateGetAllDispose;
    loadDetailRequest: typeof hrTemplateGetByIdRequest;
    loadDetailDispose: typeof hrTemplateGetByIdDispose;
  };
}

export interface WithHRTemplate extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrTemplateGetAll, hrTemplateGetById }: IAppState) => ({
  hrTemplateState: {
    all: hrTemplateGetAll,
    detail: hrTemplateGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrTemplateDispatch: {
    // command
    createRequest: (request: IHRTemplatePostRequest) => dispatch(hrTemplatePostRequest(request)),
    createDispose: () => dispatch(hrTemplatePostDispose()),
    updateRequest: (request: IHRTemplatePutRequest) => dispatch(hrTemplatePutRequest(request)),
    updateDispose: () => dispatch(hrTemplatePutDispose()),
    
    // query
    loadAllRequest: (request: IHRTemplateGetAllRequest) => dispatch(hrTemplateGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrTemplateGetAllDispose()),
    loadDetailRequest: (request: IHRTemplateGetByIdRequest) => dispatch(hrTemplateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrTemplateGetByIdDispose()),
  }
});

export const withHRTemplate = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);