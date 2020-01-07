import { INotifPeriodDeletePayload } from '@hr.notification/classes/request/period';
import { WithNotifPeriod, withNotifPeriod } from '@hr.notification/hoc/withNotifPeriod';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { NotifPeriodDetailView } from './NotifPeriodDetailView';

interface IOwnRouteParams {
  periodUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: LookupUserAction;
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

export type NotifPeriodDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithNotifPeriod
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<NotifPeriodDetailProps, IOwnState> = (props: NotifPeriodDetailProps): IOwnState => ({
  shouldLoad: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
});

const stateUpdaters: StateUpdaters<NotifPeriodDetailProps, IOwnState, IOwnStateUpdaters> = {
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
  setModify: (prevState: IOwnState, props: NotifPeriodDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.period.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(notifMessage.period.confirm.modifyDescription),
  }),
  setDelete: (prevState: IOwnState, props: NotifPeriodDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.period.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(notifMessage.period.confirm.deleteDescription),
  })
};

const handlerCreators: HandleCreators<NotifPeriodDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifPeriodDetailProps) => () => { 
    if (props.userState.user && props.match.params.periodUid && !props.notifPeriodState.detail.isLoading) {
      props.notifPeriodDispatch.loadDetailRequest({
        periodUid: props.match.params.periodUid,
      });
    }
  },
  handleOnSelectedMenu: (props: NotifPeriodDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LookupUserAction.Modify:
        props.setModify();        
        break;
      case LookupUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: NotifPeriodDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: NotifPeriodDetailProps) => () => {
    const { response } = props.notifPeriodState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let periodUid: string | undefined;

    // get project uid
    if (response.data) {
      periodUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/hr/notification/periods/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: periodUid 
      });
    }
  },
  handleDelete: (props: NotifPeriodDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.notifPeriodDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    
    // props checking
    if (!match.params.periodUid) {
      const message = intl.formatMessage(notifMessage.period.message.emptyProps);
      return Promise.reject(message);
    }

    const payload = {
      periodUid: match.params.periodUid
    };
    
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as INotifPeriodDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: NotifPeriodDetailProps) => () => {
    props.history.push('/hr/notification/periods');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(notifMessage.period.message.deleteSuccess, { uid : props.match.params.periodUid })
    });
  },
  handleDeleteFail: (props: NotifPeriodDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(notifMessage.period.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<NotifPeriodDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifPeriodDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.periodUid !== prevProps.match.params.periodUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.notifPeriodState.detail.response !== prevProps.notifPeriodState.detail.response) {
      const { isLoading } = this.props.notifPeriodState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const NotifPeriodDetail = compose(
  setDisplayName('NotifPeriodDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withNotifPeriod,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<NotifPeriodDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(NotifPeriodDetailView);