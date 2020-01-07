import { AppRole } from '@constants/AppRole';
import { KPIOpenUserAction } from '@kpi/classes/types/open/KPIOpenUserAction';
import { WithKPIOpen, withKPIOpen } from '@kpi/hoc/withKPIOpen';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPIOpenDetailView } from './KPIOpenDetailView';

interface IOwnRouteParams {
  openUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: KPIOpenUserAction;
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
}

export type KPIOpenDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithKPIOpen
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIOpenDetailProps, IOwnState> = (props: KPIOpenDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<KPIOpenDetailProps, IOwnState, IOwnStateUpdaters> = {
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
  setModify: (prevState: IOwnState, props: KPIOpenDetailProps) => (): Partial<IOwnState> => ({
    action: KPIOpenUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(kpiMessage.open.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(kpiMessage.open.confirm.modifyDescription, { state: 'open'}),
  }),
};

const handlerCreators: HandleCreators<KPIOpenDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIOpenDetailProps) => () => { 
    if (props.userState.user && props.match.params.openUid && !props.kpiOpenState.detail.isLoading) {
      props.kpiOpenDispatch.loadDetailRequest({
        openUid: props.match.params.openUid,
      });
    }
  },
  handleOnSelectedMenu: (props: KPIOpenDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIOpenUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPIOpenUserAction.Modify:
        props.setModify();        
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: KPIOpenDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: KPIOpenDetailProps) => () => {
    const { response } = props.kpiOpenState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let openUid: string | undefined;

    // get project uid
    if (response.data) {
      openUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      KPIOpenUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case KPIOpenUserAction.Modify:
          next = '/kpi/opens/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: openUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIOpenDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIOpenDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.openUid !== prevProps.match.params.openUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.kpiOpenState.detail.response !== prevProps.kpiOpenState.detail.response) {
      const { isLoading } = this.props.kpiOpenState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIOpenUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: KPIOpenUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPIOpenDetail = compose(
  setDisplayName('KPIOpenDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withKPIOpen,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<KPIOpenDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(KPIOpenDetailView);