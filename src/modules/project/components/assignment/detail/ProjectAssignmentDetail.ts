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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectAssignmentDetailView } from './ProjectAssignmentDetailView';

interface OwnRouteParams {
  assignmentUid: string;
}

interface OwnState {
  action?: ProjectUserAction | undefined;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

interface OwnHandler {
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
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<ProjectAssignmentDetailProps, OwnState> = (props: ProjectAssignmentDetailProps): OwnState => ({ 
  dialogFullScreen: false,
  dialogOpen: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: ProjectAssignmentDetailProps) => (): Partial<OwnState> => ({
    action: ProjectUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(projectMessage.assignment.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(projectMessage.assignment.confirm.modifyContent),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<ProjectAssignmentDetailProps, OwnHandler> = {
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