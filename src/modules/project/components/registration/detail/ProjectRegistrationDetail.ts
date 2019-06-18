import { WorkflowStatusType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
import { isNullOrUndefined } from 'util';

import { ProjectRegistrationDetailView } from './ProjectRegistrationDetailView';

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: ProjectUserAction;
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
  setClose: StateHandler<IOwnState>;
  setReopen: StateHandler<IOwnState>;
  setChangeOwner: StateHandler<IOwnState>;
  setAdjustHour: StateHandler<IOwnState>;
  setManageSite: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type ProjectRegistrationDetailProps 
  = WithOidc
  & WithUser
  & WithProjectRegistration
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ProjectRegistrationDetailProps, IOwnState> = (props: ProjectRegistrationDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<ProjectRegistrationDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState, props: ProjectRegistrationDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setClose: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Close,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.closeTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.closeDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setReopen: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ReOpen,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.reOpenDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setChangeOwner: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ChangeOwner,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.changeOwnerDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setAdjustHour: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.AdjustHour,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setManageSite: (state: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ManageSites,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setDefault: (state: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<ProjectRegistrationDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectRegistrationDetailProps) => () => { 
    if (props.userState.user && props.match.params.projectUid && !props.projectRegisterState.detail.isLoading) {
      props.projectRegisterDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        projectUid: props.match.params.projectUid
      });
    }
  },
  handleOnSelectedMenu: (props: ProjectRegistrationDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case ProjectUserAction.Refresh:
        props.setShouldLoad();
        break;
      case ProjectUserAction.Modify:
        props.setModify();
        break;
      case ProjectUserAction.Close:
        props.setClose();
        break;
      case ProjectUserAction.ReOpen:
        props.setReopen();
        break;
      case ProjectUserAction.AdjustHour:
        props.setAdjustHour();
        break;
      case ProjectUserAction.ChangeOwner:
        props.setChangeOwner();
        break;
      case ProjectUserAction.ManageSites:
        props.setManageSite();
        break;
    
      default:
        break;
    }
  },
  handleOnCloseDialog: (props: ProjectRegistrationDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: ProjectRegistrationDetailProps) => () => { 
    const { response } = props.projectRegisterState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let companyUid: string | undefined;
    let projectUid: string | undefined;

    // get company uid
    if (response.data && response.data.customer) {
      companyUid = response.data.customer.companyUid;
    }

    // get project uid
    if (response.data) {
      projectUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      ProjectUserAction.Modify, 
      ProjectUserAction.ChangeOwner, 
      ProjectUserAction.AdjustHour, 
      ProjectUserAction.Close, 
      ProjectUserAction.ReOpen, 
      ProjectUserAction.ManageSites
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case ProjectUserAction.Modify:
          next = '/project/requests/form';
          break;

        case ProjectUserAction.ChangeOwner:
          next = '/project/requests/owner';
          break;

        case ProjectUserAction.AdjustHour:
          next = '/project/requests/hour';
          break;
        
        case ProjectUserAction.Close:
        case ProjectUserAction.ReOpen:
          next = '/project/requests/status';
          break;

        case ProjectUserAction.ManageSites:
          next = `/project/requests/sites/${companyUid}/${projectUid}`;
          break;

        default:
          break;
      }

      props.setDefault();

      if (props.location.state && props.location.state.isAdministration) {
        props.history.push(next, { 
          uid: projectUid,
          isAdministration : true
        });
      } else {
        props.history.push(next, { 
          uid: projectUid 
        });
      }
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegistrationDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectRegistrationDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.projectUid !== prevProps.match.params.projectUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.projectRegisterState.detail.response !== prevProps.projectRegisterState.detail.response) {
      const { user } = this.props.userState;
      const { isLoading, response } = this.props.projectRegisterState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => { 
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };
      
      // find project owner status
      let isOwner = false;

      if (user && response && response.data && response.data.ownerEmployeeUid) {
        isOwner = user.uid === response.data.ownerEmployeeUid;
      }

      // find child project uid
      let _haschildProject = false;

      if (response && response.data) {
        _haschildProject = !isNullOrUndefined(response.data.childProjectUid);
      }

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: ProjectUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: ProjectUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]) && (isOwner || this.props.isAdmin)
        },
        {
          id: ProjectUserAction.Close,
          name: this.props.intl.formatMessage(projectMessage.registration.option.close),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]) && (isOwner || this.props.isAdmin)
        },
        {
          id: ProjectUserAction.ReOpen,
          name: this.props.intl.formatMessage(projectMessage.registration.option.reOpen),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Closed ]) && this.props.isAdmin
        },
        {
          id: ProjectUserAction.AdjustHour,
          name: this.props.intl.formatMessage(projectMessage.registration.option.hour),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]) && this.props.isAdmin
        },
        {
          id: ProjectUserAction.ChangeOwner,
          name: this.props.intl.formatMessage(projectMessage.registration.option.owner),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved ]) && (isOwner || this.props.isAdmin) && !_haschildProject
        },
        {
          id: ProjectUserAction.ManageSites,
          name: this.props.intl.formatMessage(projectMessage.registration.option.site),
          enabled: !isLoading,
          visible: isContains(_statusType, [WorkflowStatusType.Approved, WorkflowStatusType.ReOpened]) && this.props.isAdmin
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const ProjectRegistrationDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('ProjectRegistrationDetail')
)(ProjectRegistrationDetailView);