import { AppRole } from '@constants/AppRole';
import { KPIEmployeeUserAction } from '@kpi/classes/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
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
import { WithKPIAssign, withKPIAssign } from '@kpi/hoc/withKPIAssign';
import { MyKPIAssignDetailView } from './MyKPIAssignDetailView';

interface IOwnRouteParams {
  kpiAssignUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: KPIEmployeeUserAction;
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
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type MyKPIAssignDetailProps
  = WithUser
  & WithOidc
  & WithKPIAssign
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<MyKPIAssignDetailProps, IOwnState> = (props: MyKPIAssignDetailProps): IOwnState => {
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
  };
};

const stateUpdaters: StateUpdaters<MyKPIAssignDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: MyKPIAssignDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: MyKPIAssignDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: MyKPIAssignDetailProps) => (): Partial<IOwnState> => ({
    action: KPIEmployeeUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(kpiMessage.employee.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(kpiMessage.employee.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<MyKPIAssignDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: MyKPIAssignDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiAssignUid && props.match.params.kpiAssignUid && !props.kpiAssignState.detail.isLoading) {
      props.kpiAssignDispatch.loadDetailRequest({
        employeeUid: props.userState.user && props.userState.user.uid,
        kpiAssignUid: props.match.params.kpiAssignUid
      });
    }
  },
  handleOnSelectedMenu: (props: MyKPIAssignDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIAssignUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPIAssignUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: MyKPIAssignDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: MyKPIAssignDetailProps) => () => {
    const { response } = props.kpiAssignState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<MyKPIAssignDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: MyKPIAssignDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.kpiAssignUid !== prevProps.match.params.kpiAssignUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.kpiAssignState.detail.response !== prevProps.kpiAssignState.detail.response) {
      const { isLoading } = this.props.kpiAssignState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIAssignUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const MyKPIAssignDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIAssign,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('MyKPIAssignDetail')
)(MyKPIAssignDetailView);