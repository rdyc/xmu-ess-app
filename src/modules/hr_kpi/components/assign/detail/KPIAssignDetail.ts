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
import { KPIAssignDetailView } from './KPIAssignDetailView';

interface IOwnRouteParams {
  employeeUid: string;
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

export type KPIAssignDetailProps
  = WithUser
  & WithOidc
  & WithKPIAssign
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIAssignDetailProps, IOwnState> = (props: KPIAssignDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<KPIAssignDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: KPIAssignDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: KPIAssignDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: KPIAssignDetailProps) => (): Partial<IOwnState> => ({
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

const handlerCreators: HandleCreators<KPIAssignDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIAssignDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiAssignUid && props.match.params.kpiAssignUid && !props.kpiAssignState.detail.isLoading) {
      props.kpiAssignDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        kpiAssignUid: props.match.params.kpiAssignUid
      });
    }
  },
  handleOnSelectedMenu: (props: KPIAssignDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: KPIAssignDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: KPIAssignDetailProps) => () => {
    const { response } = props.kpiAssignState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let templateUid: string | undefined;

    // get templateUid uid
    if (response.data) {
      employeeUid = response.data.employeeUid;
      templateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      KPIEmployeeUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case KPIEmployeeUserAction.Modify:
          next = `/kpi/assigns/${employeeUid}/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: templateUid, 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIAssignDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIAssignDetailProps) {
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
        {
          id: KPIAssignUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPIAssignDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIAssign,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('KPIAssignDetail')
)(KPIAssignDetailView);