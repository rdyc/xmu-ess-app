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

import { KPIManagerInputDetailView } from './KPIManagerInputDetailView';

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

export type KPIManagerInputDetailProps
  = WithUser
  & WithOidc
  & WithKPIEmployee
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<KPIManagerInputDetailProps, IOwnState> = (props: KPIManagerInputDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<KPIManagerInputDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: KPIManagerInputDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: KPIManagerInputDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: KPIManagerInputDetailProps) => (): Partial<IOwnState> => ({
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

const handlerCreators: HandleCreators<KPIManagerInputDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIManagerInputDetailProps) => () => { 
    if (props.userState.user && props.match.params.kpiUid && props.match.params.kpiUid && !props.kpiEmployeeState.detail.isLoading) {
      props.kpiEmployeeDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        kpiUid: props.match.params.kpiUid
      });
    }
  },
  handleOnSelectedMenu: (props: KPIManagerInputDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: KPIManagerInputDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: KPIManagerInputDetailProps) => () => {
    const { response } = props.kpiEmployeeState.detail;

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
          next = `/kpi/employees/${employeeUid}/form`;
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

const lifecycles: ReactLifeCycleFunctions<KPIManagerInputDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: KPIManagerInputDetailProps) {
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
      const { isLoading, response } = this.props.kpiEmployeeState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPIEmployeeUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
      ];

      if (response && response.data && response.data.isFinal) {
        options.push({
          id: KPIEmployeeUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        });
      }

      this.props.setOptions(options);
    }
  }
};

export const KPIManagerInputDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withKPIEmployee,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('KPIManagerInputDetail')
)(KPIManagerInputDetailView);