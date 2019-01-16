import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { WorkflowMenuListView } from './WorkflowMenuListView';

interface OwnOption {
}

interface OwnState {
  companyUid?: string;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setCompany: StateHandler<OwnState>;
}

interface OwnHandler {
  handleGoToDetail: (menuUid: string, companyUid?: string) => void;
  handleSelected: (event: any, newValue: string, oldValue: string) => void;
  handleRedirectTo: (path: string, state?: any) => void;
}

export type WorkflowMenuListProps
  = OwnOption
  & WithOrganizationWorkflow
  & WithLookupMenu
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & OwnHandler
  & RouteComponentProps
  & WithLayout
  & WithWidth;

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setCompany: (prevState: OwnState) => (newState: string) => ({
    companyUid: newState ? newState !== '' ? newState : undefined : undefined
  })
};

const handlerCreators: HandleCreators<WorkflowMenuListProps, OwnHandler> = {
  handleGoToDetail: (props: WorkflowMenuListProps) => (menuUid: string, companyUid: string) => {
    const { history } = props;
    const { response } = props.lookupMenuState.list;
    const { loadListDispose } = props.lookupMenuDispatch;

    if (response) {
      loadListDispose();
    }

    history.push(`/organization/workflow/${companyUid}/${menuUid}`);
  },
  handleSelected: (props: WorkflowMenuListProps) => (event: any, newValue: string, oldValue: string) => {
    props.setCompany(newValue);
  },
  handleRedirectTo: (props: WorkflowMenuListProps) => (path: string, state?: any) => {
    props.history.push(path, state);
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<WorkflowMenuListProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch, intl
    } = this.props;
    const { loadListRequest } = this.props.lookupMenuDispatch;
    const { response, isLoading } = this.props.lookupMenuState.list;

    const filter: any = {
      orderBy: 'uid',
      direction: 'ascending'
    };

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Lookup,
        parentUid: AppMenu.LookupWorkflow,
        title: intl.formatMessage(organizationMessage.workflowSetup.page.listTitle),
        subTitle : intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
      },
      status: {
        isNavBackVisible: false,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });

    if (!response && !isLoading) {
      loadListRequest({
        filter
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { loadAllDispose } = this.props.lookupMenuDispatch;
    
    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    // layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();
    loadAllDispose();
  }
};

export const workflowMenuList = compose<WorkflowMenuListProps, {}>(
  withLayout,
  withLookupMenu,
  injectIntl,
  withStateHandlers({}, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(WorkflowMenuListView);