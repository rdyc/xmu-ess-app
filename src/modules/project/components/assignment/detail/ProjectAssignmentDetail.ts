import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  mapper,
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
  action?: ProjectUserAction | undefined;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

export type ProjectAssignmentDetailProps
  = WithProjectAssignment
  & WithOidc
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<ProjectAssignmentDetailProps, IOwnState> = (props: ProjectAssignmentDetailProps): IOwnState => ({ 
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  setModify: (prevState: IOwnState, props: ProjectAssignmentDetailProps) => (): Partial<IOwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.assignment.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.assignment.confirm.modifyContent),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.cancel),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
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

const handlerCreators: HandleCreators<ProjectAssignmentDetailProps, IOwnHandler> = {
  handleOnModify: (props: ProjectAssignmentDetailProps) => () => { 
    props.setModify();
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

export const ProjectAssignmentDetail = compose<ProjectAssignmentDetailProps, {}>(
  setDisplayName('ProjectAssignmentDetail'),
  withOidc,
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators)
)(ProjectAssignmentDetailView);