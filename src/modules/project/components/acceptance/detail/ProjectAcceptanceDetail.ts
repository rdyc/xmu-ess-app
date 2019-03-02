import { WorkflowStatusType } from '@common/classes/types';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
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

import { ProjectAcceptanceDetailView } from './ProjectAcceptanceDetailView';

interface IOwnRouteParams {
  assignmentUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  newMandays: number;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setMandays: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnClickItem: (assignmentItemUid: string) => void;
  handleCalculateNewAssignment: () => void;
}

export type ProjectAcceptanceDetailProps
  = WithProjectAssignment
  & WithUser
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<ProjectAcceptanceDetailProps, IOwnState> = (props: ProjectAcceptanceDetailProps): IOwnState => ({ 
  shouldLoad: false,
  newMandays: 0
});

const stateUpdaters: StateUpdaters<ProjectAcceptanceDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setMandays: (state: IOwnState) => (value: number): Partial<IOwnState> => ({
    newMandays: value
  })
};

const handlerCreators: HandleCreators<ProjectAcceptanceDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAcceptanceDetailProps) => () => { 
    if (props.userState.user && props.match.params.assignmentUid && !props.projectAssignmentState.detail.isLoading) {
      props.projectAssignmentDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        assignmentUid: props.match.params.assignmentUid
      });
    }
  },
  handleOnSelectedMenu: (props: ProjectAcceptanceDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case ProjectUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
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
  componentDidUpdate(prevProps: ProjectAcceptanceDetailProps) {
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
        }
      ];

      this.props.setOptions(options);

      this.props.handleCalculateNewAssignment();
    }
  }
};

export const ProjectAcceptanceDetail = compose<ProjectAcceptanceDetailProps, {}>(
  setDisplayName('ProjectAcceptanceDetail'),
  withRouter,
  withUser,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectAcceptanceDetailView);