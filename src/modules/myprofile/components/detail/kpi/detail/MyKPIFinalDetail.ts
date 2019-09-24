import { AppRole } from '@constants/AppRole';
import { KPIFinalUserAction } from '@kpi/classes/types';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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

import { KPIAssignUserAction } from '@kpi/classes/types/assign/KPIAssignUserAction';
import { WithKPIFinal, withKPIFinal } from '@kpi/hoc/withKPIFinal';
import { MyKPIFinalDetailView } from './MyKPIFinalDetailView';

interface IOwnRouteParams {
  kpiUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: KPIFinalUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

export type MyKPIFinalDetailProps
  = WithUser
  & WithOidc
  & WithKPIFinal
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<MyKPIFinalDetailProps, IOwnState> = (props: MyKPIFinalDetailProps): IOwnState => {
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
  };
};

const stateUpdaters: StateUpdaters<MyKPIFinalDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<MyKPIFinalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyKPIFinalDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiUid && props.match.params.kpiUid && !props.kpiFinalState.detail.isLoading) {
      props.kpiFinalDispatch.loadDetailRequest({
        employeeUid: props.userState.user.uid,
        kpiUid: props.match.params.kpiUid
      });
    }
  },
  handleOnSelectedMenu: (props: MyKPIFinalDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIAssignUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: MyKPIFinalDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: MyKPIFinalDetailProps) => () => {
    const { response } = props.kpiFinalState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<MyKPIFinalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MyKPIFinalDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.kpiUid !== prevProps.match.params.kpiUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.kpiFinalState.detail.response !== prevProps.kpiFinalState.detail.response) {
      const { isLoading } = this.props.kpiFinalState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIFinalUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const MyKPIFinalDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIFinal,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('MyKPIFinalDetail')
)(MyKPIFinalDetailView);