import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
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

import { ProjectAssignmentDetailView } from './ProjectAssignmentDetailView';

interface IOwnRouteParams {
  assignmentUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
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
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type ProjectAssignmentDetailProps
  = WithProjectAssignment
  & WithOidc
  & WithUser
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ProjectAssignmentDetailProps, IOwnState> = (props: ProjectAssignmentDetailProps): IOwnState => ({ 
  shouldLoad: false,
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<ProjectAssignmentDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (state: IOwnState, props: ProjectAssignmentDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.assignment.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.assignment.confirm.modifyMessage),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.cancel),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
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

const handlerCreators: HandleCreators<ProjectAssignmentDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAssignmentDetailProps) => () => { 
    if (props.userState.user && props.match.params.assignmentUid && !props.projectAssignmentState.detail.isLoading) {
      props.projectAssignmentDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        assignmentUid: props.match.params.assignmentUid
      });
    }
  },
  handleOnSelectedMenu: (props: ProjectAssignmentDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case ProjectUserAction.Refresh:
        props.setShouldLoad();
        break;
      case ProjectUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
    }
  },
  handleOnCloseDialog: (props: ProjectAssignmentDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: ProjectAssignmentDetailProps) => () => { 
    const { response } = props.projectAssignmentState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let companyUid: string | undefined;
    let projectUid: string | undefined;
    let assignmentUid: string | undefined;

    // get company uid
    if (response.data && response.data.customer) {
      companyUid = response.data.customer.companyUid;
    }

    // get project & assignment uid
    if (response.data) {
      assignmentUid = response.data.uid;
      projectUid = response.data.projectUid;
    }

    // actions with new page
    const actions = [
      ProjectUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case ProjectUserAction.Modify:
          next = '/project/assignments/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, {
        companyUid,
        assignmentUid, 
        projectUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAssignmentDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.assignmentUid !== prevProps.match.params.assignmentUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.projectAssignmentState.detail.response !== prevProps.projectAssignmentState.detail.response) {
      const { isLoading } = this.props.projectAssignmentState.detail;

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
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const ProjectAssignmentDetail = compose<ProjectAssignmentDetailProps, {}>(
  setDisplayName('ProjectAssignmentDetail'),
  withRouter,
  withOidc,
  withUser,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAssignmentDetailView);