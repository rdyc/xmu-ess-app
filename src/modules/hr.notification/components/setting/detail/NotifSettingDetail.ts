import { INotifSettingDeletePayload } from '@hr.notification/classes/request/setting';
import { NotifUserAction } from '@hr.notification/classes/types';
import { WithNotifSetting, withNotifSetting } from '@hr.notification/hoc/withNotifSetting';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { NotifSettingDetailView } from './NotifSettingDetailView';

interface IOwnRouteParams {
  settingUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: NotifUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

export type NotifSettingDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithNotifSetting
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<NotifSettingDetailProps, IOwnState> = (props: NotifSettingDetailProps): IOwnState => ({
  shouldLoad: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
});

const stateUpdaters: StateUpdaters<NotifSettingDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: NotifSettingDetailProps) => (): Partial<IOwnState> => ({
    action: NotifUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.setting.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(notifMessage.setting.confirm.modifyDescription),
  }),
  setDelete: (prevState: IOwnState, props: NotifSettingDetailProps) => (): Partial<IOwnState> => ({
    action: NotifUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.setting.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(notifMessage.setting.confirm.deleteDescription),
  })
};

const handlerCreators: HandleCreators<NotifSettingDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifSettingDetailProps) => () => { 
    if (props.userState.user && props.match.params.settingUid && !props.notifSettingState.detail.isLoading) {
      props.notifSettingDispatch.loadDetailRequest({
        settingUid: props.match.params.settingUid,
      });
    }
  },
  handleOnSelectedMenu: (props: NotifSettingDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case NotifUserAction.Refresh:
        props.setShouldLoad();
        break;
      case NotifUserAction.Modify:
        props.setModify();        
        break;
      case NotifUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: NotifSettingDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: NotifSettingDetailProps) => () => {
    const { response } = props.notifSettingState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let settingUid: string | undefined;

    // get project uid
    if (response.data) {
      settingUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      NotifUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case NotifUserAction.Modify:
          next = '/hr/notification/settings/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: settingUid 
      });
    }
  },
  handleDelete: (props: NotifSettingDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.notifSettingDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    
    // props checking
    if (!match.params.settingUid) {
      const message = intl.formatMessage(notifMessage.setting.message.emptyProps);
      return Promise.reject(message);
    }

    const payload = {
      settingUid: match.params.settingUid
    };
    
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as INotifSettingDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: NotifSettingDetailProps) => () => {
    props.history.push('/hr/notification/settings');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(notifMessage.setting.message.deleteSuccess, { uid : props.match.params.settingUid })
    });
  },
  handleDeleteFail: (props: NotifSettingDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(notifMessage.setting.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<NotifSettingDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifSettingDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.settingUid !== prevProps.match.params.settingUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.notifSettingState.detail.response !== prevProps.notifSettingState.detail.response) {
      const { isLoading } = this.props.notifSettingState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: NotifUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: NotifUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: NotifUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const NotifSettingDetail = compose(
  setDisplayName('NotifSettingDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withNotifSetting,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<NotifSettingDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(NotifSettingDetailView);