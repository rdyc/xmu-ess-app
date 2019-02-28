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

import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ILookupCompany } from '@lookup/classes';
import { ICompany } from '@lookup/classes/response';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { WorkflowMenuListView } from './WorkflowMenuListView';

interface OwnOption {
}

interface OwnState {
  companyUid?: string;
  dataCompany?: ICompany;
  isFilterOpen: boolean;
  forceReload: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setFilterVisibility: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
  setOnRefresh: StateHandler<OwnState>;
}

interface OwnHandler {
  handleGoToDetail: (menuUid: string, companyUid?: string) => void;
  handleRedirectTo: (path: string, state?: any) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (company: ILookupCompany) => void;
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
  & WithStyles<typeof styles>
  & WithWidth;

const createProps: mapper<WorkflowMenuListProps, OwnState> = (props: WorkflowMenuListProps): OwnState => {
  return {
    isFilterOpen: false,
    forceReload: false
  };
};

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setFilterVisibility: (state: OwnState) => (): Partial<OwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: (state: OwnState) => (company: ILookupCompany | undefined): Partial<OwnState> => ({
    companyUid: company ? company.uid : undefined,
    dataCompany: company,
    isFilterOpen: false
  }),
  setOnRefresh: (prevState: OwnState) => () => ({
    forceReload: true,
    companyUid: undefined
  }),
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
  handleRedirectTo: (props: WorkflowMenuListProps) => (path: string, state?: any) => {
    props.history.push(path, state);
  },
  handleFilterVisibility: (props: WorkflowMenuListProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: WorkflowMenuListProps) => (company: ILookupCompany | undefined) => {
    props.setFilterApplied(company);
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<WorkflowMenuListProps, OwnState> = {
  componentWillMount() {
    const {
      layoutDispatch, intl, forceReload
    } = this.props;
    const { response, isLoading } = this.props.lookupMenuState.list;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.LookupWorkflow,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(organizationMessage.workflowSetup.page.listTitle),
        subTitle: intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
      },
      status: {
        isNavBackVisible: false,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });

    if ((!response && !isLoading) || forceReload ) {
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { loadAllDispose } = this.props.lookupMenuDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.moreHide();
    loadAllDispose();
  },
};

const loadData = (props: WorkflowMenuListProps): void => {
  const { loadListRequest } = props.lookupMenuDispatch;

  loadListRequest({
    filter: {
      orderBy: 'uid',
      direction: 'ascending'
    }
  });
};

export const workflowMenuList = compose<WorkflowMenuListProps, {}>(
  withLayout,
  withLookupMenu,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(WorkflowMenuListView);