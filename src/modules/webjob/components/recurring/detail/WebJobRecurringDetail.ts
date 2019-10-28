import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IWebJobUserAction } from '@webjob/classes/types';
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

import { WebJobRecurringDetailView } from './WebJobRecurringDetailView';

interface IOwnRouteParams {
  recurringUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: IWebJobUserAction;
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
  setDefault: StateHandler<IOwnState>;
}

export type WebJobRecurringDetailProps
  = WithOidc
  & WithUser
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
      dialogOpen: false
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
    action: IWebJobUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(webJobMessage.shared.confirm.modifyTitle, {state: 'Recurring'}),
    dialogContent: props.intl.formatMessage(webJobMessage.shared.confirm.modifyDescription, {state: 'recurring'}),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
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
      case IWebJobUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IWebJobUserAction.Modify:
        props.setModify();
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
      IWebJobUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IWebJobUserAction.Modify:
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
          id: IWebJobUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: IWebJobUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: false,
          visible: true,
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
  withWebJobRecurring,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobRecurringDetail')
)(WebJobRecurringDetailView);