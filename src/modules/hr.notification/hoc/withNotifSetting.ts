import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  INotifSettingDeleteRequest,
  INotifSettingGetAllRequest,
  INotifSettingGetByIdRequest,
  INotifSettingPostRequest,
  INotifSettingPutRequest,
} from '@hr.notification/classes/queries/setting';
import { INotifSetting, INotifSettingDetail } from '@hr.notification/classes/response';
import {
  notifSettingDeleteDispose,
  notifSettingDeleteRequest,
  notifSettingGetAllDispose,
  notifSettingGetAllRequest,
  notifSettingGetByIdDispose,
  notifSettingGetByIdRequest,
  notifSettingPostDispose,
  notifSettingPostRequest,
  notifSettingPutDispose,
  notifSettingPutRequest,
} from '@hr.notification/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  notifSettingState: {
    all: IQueryCollectionState<INotifSettingGetAllRequest, INotifSetting>;
    detail: IQuerySingleState<INotifSettingGetByIdRequest, INotifSettingDetail>;
  };
}

interface PropsFromDispatch {
  notifSettingDispatch: {
    // command
    createRequest: typeof notifSettingPostRequest;
    createDispose: typeof notifSettingPostDispose;
    updateRequest: typeof notifSettingPutRequest;
    updateDispose: typeof notifSettingPutDispose;
    deleteRequest: typeof notifSettingDeleteRequest;
    deleteDispose: typeof notifSettingDeleteDispose;

    // query
    loadAllRequest: typeof notifSettingGetAllRequest;
    loadAllDispose: typeof notifSettingGetAllDispose;
    loadDetailRequest: typeof notifSettingGetByIdRequest;
    loadDetailDispose: typeof notifSettingGetByIdDispose;
  };
}

export interface WithNotifSetting extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ settingGetAll, settingGetById }: IAppState) => ({
  notifSettingState: {
    all: settingGetAll,
    detail: settingGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  notifSettingDispatch: {
    // command
    createRequest: (request: INotifSettingPostRequest) => dispatch(notifSettingPostRequest(request)),
    createDispose: () => dispatch(notifSettingPostDispose()),
    updateRequest: (request: INotifSettingPutRequest) => dispatch(notifSettingPutRequest(request)),
    updateDispose: () => dispatch(notifSettingPutDispose()),
    deleteRequest: (request: INotifSettingDeleteRequest) => dispatch(notifSettingDeleteRequest(request)),
    deleteDispose: () => dispatch(notifSettingDeleteDispose()),
    
    // query
    loadAllRequest: (request: INotifSettingGetAllRequest) => dispatch(notifSettingGetAllRequest(request)),
    loadAllDispose: () => dispatch(notifSettingGetAllDispose()),
    loadDetailRequest: (request: INotifSettingGetByIdRequest) => dispatch(notifSettingGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(notifSettingGetByIdDispose()),
  }
});

export const withNotifSetting = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);