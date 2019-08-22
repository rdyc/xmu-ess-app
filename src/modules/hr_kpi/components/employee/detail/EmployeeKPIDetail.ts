import { AppRole } from '@constants/AppRole';
import { EmployeeKPIUserAction } from '@kpi/classes/types';
import { WithEmployeeKPI, withEmployeeKPI } from '@kpi/hoc/withEmployeeKPI';
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

import { EmployeeKPIDetailView } from './EmployeeKPIDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  kpiUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: EmployeeKPIUserAction;
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

export type EmployeeKPIDetailProps
  = WithUser
  & WithOidc
  & WithEmployeeKPI
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<EmployeeKPIDetailProps, IOwnState> = (props: EmployeeKPIDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<EmployeeKPIDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: EmployeeKPIDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: EmployeeKPIDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: EmployeeKPIDetailProps) => (): Partial<IOwnState> => ({
    action: EmployeeKPIUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(kpiMessage.template.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(kpiMessage.template.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<EmployeeKPIDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: EmployeeKPIDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiUid && props.match.params.kpiUid && !props.employeeKPIState.detail.isLoading) {
      props.employeeKPIDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        kpiUid: props.match.params.kpiUid
      });
    }
  },
  handleOnSelectedMenu: (props: EmployeeKPIDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case EmployeeKPIUserAction.Refresh:
        props.setShouldLoad();
        break;
      case EmployeeKPIUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: EmployeeKPIDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: EmployeeKPIDetailProps) => () => {
    const { response } = props.employeeKPIState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let employeeName: string | undefined;
    let templateUid: string | undefined;

    // get templateUid uid
    if (response.data) {
      employeeUid = response.data.employeeUid;
      employeeName = response.data.employee && response.data.employee.fullName || '';
      templateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      EmployeeKPIUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case EmployeeKPIUserAction.Modify:
          next = '/kpi/employees/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        employeeUid,
        employeeName,
        uid: templateUid, 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeKPIDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: EmployeeKPIDetailProps) {
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
    if (this.props.employeeKPIState.detail.response !== prevProps.employeeKPIState.detail.response) {
      const { isLoading } = this.props.employeeKPIState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: EmployeeKPIUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: EmployeeKPIUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const EmployeeKPIDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withEmployeeKPI,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('EmployeeKPIDetail')
)(EmployeeKPIDetailView);