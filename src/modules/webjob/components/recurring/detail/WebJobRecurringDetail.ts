import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
import { IWebJobRecurringDeletePayload } from '@webjob/classes/request';
import { WithWebJobRecurring, withWebJobRecurring } from '@webjob/hoc/withWebJobRecurring';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { WebJobRecurringDetailView } from './WebJobRecurringDetailView';

interface IOwnRouteParams {
  recurringUid: string;
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

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type WebJobRecurringDetailProps
  = WithOidc
  & WithUser
  & WithLayout
  & WithWebJobRecurring
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<WebJobRecurringDetailProps, IOwnState> = (props: WebJobRecurringDetailProps): IOwnState => { 
    // checking admin status
    const { user } = props.oidcState;
    let isAdmin: boolean = false;
  
    if (user) {
      const role: string | string[] | undefined = user.profile.role;
  
      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }
    }
    
    return { 
      isAdmin,
      shouldLoad: false,
      dialogFullScreen: false,
      dialogOpen: false,
      dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
      dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<WebJobRecurringDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: WebJobRecurringDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: WebJobRecurringDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: WebJobRecurringDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(webJobMessage.shared.confirm.modifyTitle, {state: 'Recurring'}),
    dialogContent: props.intl.formatMessage(webJobMessage.shared.confirm.modifyDescription, {state: 'recurring'}),
  }),
  setDelete: (prevState: IOwnState, props: WebJobRecurringDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(webJobMessage.shared.confirm.deleteTitle, {state: 'Monitoring'}),
    dialogContent: props.intl.formatMessage(webJobMessage.shared.confirm.deleteDescription, { state: 'monitoring'}),
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
  })
};

const handlerCreators: HandleCreators<WebJobRecurringDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobRecurringDetailProps) => () => { 
    const { user } = props.userState;
    const recurringUid = props.match.params.recurringUid;
    const { isLoading } = props.webJobRecurringState.detail;

    if (user && recurringUid && !isLoading) {
      props.webJobRecurringDispatch.loadDetailRequest({
        recurringUid
      });
    }
  },
  handleOnSelectedMenu: (props: WebJobRecurringDetailProps) => (item: IPopupMenuOption) => {
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
  handleOnCloseDialog: (props: WebJobRecurringDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: WebJobRecurringDetailProps) => () => {
    const { response } = props.webJobRecurringState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let recurringUid: string | undefined;

    // get project uid
    if (response.data) {
      recurringUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/webjob/recurrings/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: recurringUid 
      });
    }
  },
  handleDelete: (props: WebJobRecurringDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.webJobRecurringDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.recurringUid) {
      const message = intl.formatMessage(webJobMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      recurringUid: match.params.recurringUid
    };

    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IWebJobRecurringDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: WebJobRecurringDetailProps) => (response: boolean) => {
    props.history.push('/webjob/recurrings');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(webJobMessage.shared.message.deleteSuccess, { state: 'Recurring', type: 'ID', uid : props.match.params.recurringUid })
    });
  },
  handleDeleteFail: (props: WebJobRecurringDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(webJobMessage.shared.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<WebJobRecurringDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
  componentDidUpdate(prevProps: WebJobRecurringDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.recurringUid !== prevProps.match.params.recurringUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.webJobRecurringState.detail.response !== prevProps.webJobRecurringState.detail.response) {
      const { isLoading } = this.props.webJobRecurringState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
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

export const WebJobRecurringDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withWebJobRecurring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobRecurringDetail')
)(WebJobRecurringDetailView);