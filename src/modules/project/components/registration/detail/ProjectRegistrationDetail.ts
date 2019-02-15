import { WorkflowStatusType } from '@common/classes/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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

import { ProjectRegistrationDetailView } from './ProjectRegistrationDetailView';

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnChangeStatus: () => void;
  handleOnChangeOwner: () => void;
  handleOnAdjustHour: () => void;
  handleOnReOpen: () => void;
  handleOnManageSite: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: ProjectUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setClose: StateHandler<IOwnState>;
  setReopen: StateHandler<IOwnState>;
  setChangeOwner: StateHandler<IOwnState>;
  setAdjustHour: StateHandler<IOwnState>;
  setManageSite: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type ProjectRegistrationDetailProps 
  = WithUser
  & WithProjectRegistration
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ProjectRegistrationDetailProps, IOwnState> = (props: ProjectRegistrationDetailProps): IOwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<ProjectRegistrationDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setClose: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Close,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.closeTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.closeDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setReopen: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
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
  setAdjustHour: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.AdjustHour,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.adjustHourDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
  }),
  setManageSite: (prevState: IOwnState, props: ProjectRegistrationDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.ManageSites,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.registration.confirm.manageSiteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
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
  handleOnModify: (props: ProjectRegistrationDetailProps) => () => { 
    props.setModify();
  },
  handleOnChangeStatus: (props: ProjectRegistrationDetailProps) => () => { 
    props.setClose();
  },
  handleOnReOpen: (props: ProjectRegistrationDetailProps) => () => { 
    props.setReopen();
  },
  handleOnChangeOwner: (props: ProjectRegistrationDetailProps) => () => { 
    props.setChangeOwner();
  },
  handleOnAdjustHour: (props: ProjectRegistrationDetailProps) => () => { 
    props.setAdjustHour();
  },
  handleOnManageSite: (props: ProjectRegistrationDetailProps) => () => { 
    props.setManageSite();
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

      props.history.push(next, { 
        uid: projectUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegistrationDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectRegistrationDetailProps) {
    if (this.props.projectRegisterState.detail.response !== prevProps.projectRegisterState.detail.response) {
      const { user } = this.props.userState;
      const { isLoading, response } = this.props.projectRegisterState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // 
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => { 
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };
      
      // find project owner status
      let isOwner = false;

      if (user && response && response.data && response.data.ownerEmployeeUid) {
        isOwner = user.uid === response.data.ownerEmployeeUid;
      }

      // the results
      const options: IAppBarMenu[] = [
        {
          id: ProjectUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: ProjectUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved ]) && isOwner,
          onClick: this.props.handleOnModify
        },
        {
          id: ProjectUserAction.Close,
          name: this.props.intl.formatMessage(projectMessage.registration.option.close),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]) && (isOwner || this.props.isAdmin),
          onClick: this.props.handleOnChangeStatus
        },
        {
          id: ProjectUserAction.ReOpen,
          name: this.props.intl.formatMessage(projectMessage.registration.option.reOpen),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Closed ]) && this.props.isAdmin,
          onClick: this.props.handleOnReOpen
        },
        {
          id: ProjectUserAction.AdjustHour,
          name: this.props.intl.formatMessage(projectMessage.registration.option.hour),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved, WorkflowStatusType.ReOpened ]) && this.props.isAdmin,
          onClick: this.props.handleOnAdjustHour
        },
        {
          id: ProjectUserAction.ChangeOwner,
          name: this.props.intl.formatMessage(projectMessage.registration.option.owner),
          enabled: !isLoading,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved ]) && (isOwner || this.props.isAdmin),
          onClick: this.props.handleOnChangeOwner
        },
        {
          id: ProjectUserAction.ManageSites,
          name: this.props.intl.formatMessage(projectMessage.registration.option.site),
          enabled: !isLoading,
          visible: isContains(_statusType, [WorkflowStatusType.Approved]) && this.props.isAdmin,
          onClick: this.props.handleOnManageSite
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const ProjectRegistrationDetail = compose(
  withRouter,
  withUser,
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('ProjectRegistrationDetail')
)(ProjectRegistrationDetailView);