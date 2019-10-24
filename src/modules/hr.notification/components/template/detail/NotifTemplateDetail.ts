import { INotifTemplateDeletePayload } from '@hr.notification/classes/request/template';
import { NotifUserAction } from '@hr.notification/classes/types';
import { WithNotifTemplate, withNotifTemplate } from '@hr.notification/hoc/withNotifTemplate';
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
import { NotifTemplateDetailView } from './NotifTemplateDetailView';

interface IOwnRouteParams {
  templateUid: string;
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

export type NotifTemplateDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithNotifTemplate
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<NotifTemplateDetailProps, IOwnState> = (props: NotifTemplateDetailProps): IOwnState => ({
  shouldLoad: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
});

const stateUpdaters: StateUpdaters<NotifTemplateDetailProps, IOwnState, IOwnStateUpdaters> = {
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
  setModify: (prevState: IOwnState, props: NotifTemplateDetailProps) => (): Partial<IOwnState> => ({
    action: NotifUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.template.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(notifMessage.template.confirm.modifyDescription),
  }),
  setDelete: (prevState: IOwnState, props: NotifTemplateDetailProps) => (): Partial<IOwnState> => ({
    action: NotifUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(notifMessage.template.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(notifMessage.template.confirm.deleteDescription),
  })
};

const handlerCreators: HandleCreators<NotifTemplateDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: NotifTemplateDetailProps) => () => { 
    if (props.userState.user && props.match.params.templateUid && !props.notifTemplateState.detail.isLoading) {
      props.notifTemplateDispatch.loadDetailRequest({
        templateUid: props.match.params.templateUid,
      });
    }
  },
  handleOnSelectedMenu: (props: NotifTemplateDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: NotifTemplateDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: NotifTemplateDetailProps) => () => {
    const { response } = props.notifTemplateState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let templateUid: string | undefined;

    // get project uid
    if (response.data) {
      templateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      NotifUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case NotifUserAction.Modify:
          next = '/hr/notification/templates/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: templateUid 
      });
    }
  },
  handleDelete: (props: NotifTemplateDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.notifTemplateDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    
    // props checking
    if (!match.params.templateUid) {
      const message = intl.formatMessage(notifMessage.template.message.emptyProps);
      return Promise.reject(message);
    }

    const payload = {
      templateUid: match.params.templateUid
    };
    
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as INotifTemplateDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: NotifTemplateDetailProps) => () => {
    props.history.push('/hr/notification/templates');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(notifMessage.template.message.deleteSuccess, { uid : props.match.params.templateUid })
    });
  },
  handleDeleteFail: (props: NotifTemplateDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(notifMessage.template.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<NotifTemplateDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: NotifTemplateDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.templateUid !== prevProps.match.params.templateUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.notifTemplateState.detail.response !== prevProps.notifTemplateState.detail.response) {
      const { isLoading } = this.props.notifTemplateState.detail;

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

export const NotifTemplateDetail = compose(
  setDisplayName('NotifTemplateDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withNotifTemplate,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<NotifTemplateDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(NotifTemplateDetailView);