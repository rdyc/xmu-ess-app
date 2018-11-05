import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectAcceptanceDetailView } from './ProjectAcceptanceDetailView';

interface OwnHandler {
  handleRefresh: () => void;
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
  stateUpdate: StateHandler<OwnState>;
}

export type ProjectAcceptanceDetailProps
  = WithProjectAssignment
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectAcceptanceDetailProps, OwnState> = (props: ProjectAcceptanceDetailProps): OwnState => ({ 
  newMandays: 0
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<ProjectAcceptanceDetailProps, OwnHandler> = {
  handleRefresh: (props: ProjectAcceptanceDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { isLoading } = props.projectAssignmentState.detail;
    const { loadDetailRequest } = props.projectAssignmentDispatch;

    if (user && !isLoading) { 
      loadDetailRequest({
        companyUid: user.company.uid,
        assignmentUid: match.params.assignmentUid
      });
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

      props.stateUpdate({
        newMandays
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceDetailProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage(projectMessage.acceptance.page.detailTitle),
      subTitle : intl.formatMessage(projectMessage.acceptance.page.detailSubHeader)
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ProjectUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    handleRefresh();
  },
  componentWillReceiveProps(nextProps: ProjectAcceptanceDetailProps) {
    if (nextProps.projectAssignmentState.detail.response !== this.props.projectAssignmentState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: ProjectUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);

      this.props.handleCalculateNewAssignment();
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export const ProjectAcceptanceDetail = compose<ProjectAcceptanceDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectAcceptanceDetailView);