import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISettingDeleteRequest,
  ISettingGetAllRequest,
  ISettingGetByIdRequest,
  ISettingPostRequest,
  ISettingPutRequest,
} from '@hr.notification/classes/queries/setting';
import { ISetting } from '@hr.notification/classes/response';
import {
  settingDeleteDispose,
  settingDeleteRequest,
  settingGetAllDispose,
  settingGetAllRequest,
  settingGetByIdDispose,
  settingGetByIdRequest,
  settingPostDispose,
  settingPostRequest,
  settingPutDispose,
  settingPutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectRegisterState: {
    all: IQueryCollectionState<ISettingGetAllRequest, ISetting>;
    detail: IQuerySingleState<ISettingGetByIdRequest, ISetting>;
  };
}

interface PropsFromDispatch {
  projectRegisterDispatch: {
    // command
    createRequest: typeof settingPostRequest;
    createDispose: typeof settingPostDispose;
    updateRequest: typeof settingPutRequest;
    updateDispose: typeof settingPutDispose;
    deleteRequest: typeof settingDeleteRequest;
    deleteDispose: typeof settingDeleteDispose;

    // query
    loadAllRequest: typeof settingGetAllRequest;
    loadAllDispose: typeof settingGetAllDispose;
    loadDetailRequest: typeof settingGetByIdRequest;
    loadDetailDispose: typeof settingGetByIdDispose;
  };
}

export interface WithSetting extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ settingGetAll, settingGetById }: IAppState) => ({
  projectRegisterState: {
    all: settingGetAll,
    detail: settingGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectRegisterDispatch: {
    // command
    createRequest: (request: ISettingPostRequest) => dispatch(settingPostRequest(request)),
    createDispose: () => dispatch(settingPostDispose()),
    updateRequest: (request: ISettingPutRequest) => dispatch(settingPutRequest(request)),
    updateDispose: () => dispatch(settingPutDispose()),
    deleteRequest: (request: ISettingDeleteRequest) => dispatch(settingDeleteRequest(request)),
    deleteDispose: () => dispatch(settingDeleteDispose()),
    
    // query
    loadAllRequest: (request: ISettingGetAllRequest) => dispatch(settingGetAllRequest(request)),
    loadAllDispose: () => dispatch(settingGetAllDispose()),
    loadDetailRequest: (request: ISettingGetByIdRequest) => dispatch(settingGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(settingGetByIdDispose()),
  }
});

export const withSetting = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);