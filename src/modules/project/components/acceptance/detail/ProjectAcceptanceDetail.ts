import { WorkflowStatusType } from '@common/classes/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectAcceptanceDetailView } from './ProjectAcceptanceDetailView';

interface OwnHandler {
  handleOnClickItem: (assignmentItemUid: string) => void;
  handleCalculateNewAssignment: () => void;
}

interface OwnRouteParams {
  assignmentUid: string;
}

interface OwnState {
  newMandays: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setMandays: StateHandler<OwnState>;
}

export type ProjectAcceptanceDetailProps
  = WithProjectAssignment
  & WithUser
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectAcceptanceDetailProps, OwnState> = (props: ProjectAcceptanceDetailProps): OwnState => ({ 
  newMandays: 0
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setMandays: (prevState: OwnState) => (value: number): Partial<OwnState> => ({
    newMandays: value
  })
};

const handlerCreators: HandleCreators<ProjectAcceptanceDetailProps, OwnHandler> = {
  handleOnClickItem: (props: ProjectAcceptanceDetailProps) => (assignmentItemUid: string) => {
    props.history.push(`/project/acceptances/${props.match.params.assignmentUid}/${assignmentItemUid}`);
  },
  handleCalculateNewAssignment: (props: ProjectAcceptanceDetailProps) => () => {
    const { user } = props.userState;
    const { response } = props.projectAssignmentState.detail;

    if (user && response && response.data && response.data.items) {
      const items = response.data.items.filter(item => item.employeeUid === user.uid);

      let newMandays = 0;

      if (items) {
        items.forEach(i => {
          if (i.statusType === WorkflowStatusType.Submitted) {
            newMandays += i.mandays;
          }
        }); 
      }

      props.setMandays(newMandays);
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceDetailProps, {}> = {
  componentWillReceiveProps(nextProps: ProjectAcceptanceDetailProps) {
    if (nextProps.projectAssignmentState.detail.response !== this.props.projectAssignmentState.detail.response) {
      this.props.handleCalculateNewAssignment();
    }
  },
};

export const ProjectAcceptanceDetail = compose<ProjectAcceptanceDetailProps, {}>(
  withUser,
  withRouter,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectAcceptanceDetailView);