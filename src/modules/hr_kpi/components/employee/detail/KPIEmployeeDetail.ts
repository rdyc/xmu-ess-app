import { AppRole } from '@constants/AppRole';
import { KPIEmployeeUserAction } from '@kpi/classes/types';
import { WithKPIEmployee, withKPIEmployee } from '@kpi/hoc/withKPIEmployee';
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

import { WorkflowStatusType } from '@common/classes/types';
import { KPIEmployeeDetailView } from './KPIEmployeeDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  kpiUid: string;
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

export type KPIEmployeeDetailProps
  = WithUser
  & WithOidc
  & WithKPIEmployee
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIEmployeeDetailProps, IOwnState> = (props: KPIEmployeeDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<KPIEmployeeDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: KPIEmployeeDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: KPIEmployeeDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: KPIEmployeeDetailProps) => (): Partial<IOwnState> => ({
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

const handlerCreators: HandleCreators<KPIEmployeeDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIEmployeeDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiUid && props.match.params.kpiUid && !props.kpiEmployeeState.detail.isLoading) {
      props.kpiEmployeeDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        kpiUid: props.match.params.kpiUid
      });
    }
  },
  handleOnSelectedMenu: (props: KPIEmployeeDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPIEmployeeUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPIEmployeeUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: KPIEmployeeDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: KPIEmployeeDetailProps) => () => {
    const { response } = props.kpiEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let templateUid: string | undefined;

    // get templateUid uid
    if (response.data) {
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
          next = `/kpi/employees/form`;
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

const lifecycles: ReactLifeCycleFunctions<KPIEmployeeDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIEmployeeDetailProps) {
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
    if (this.props.kpiEmployeeState.detail.response !== prevProps.kpiEmployeeState.detail.response) {
      const { isLoading } = this.props.kpiEmployeeState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIEmployeeUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: KPIEmployeeUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: this.props.kpiEmployeeState.detail.response && 
            (this.props.kpiEmployeeState.detail.response.data.statusType === WorkflowStatusType.Submitted ||
            (this.props.kpiEmployeeState.detail.response.data.statusType === WorkflowStatusType.Accepted || !this.props.kpiEmployeeState.detail.response.data.isFinal)) || true,
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPIEmployeeDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIEmployee,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('KPIEmployeeDetail')
)(KPIEmployeeDetailView);