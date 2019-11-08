import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { ILookupCompany } from '@lookup/classes';
import { ICompany } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
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
  & WithLookupCompany
  & WithMasterPage
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & OwnHandler
  & RouteComponentProps
  & WithLayout
  & WithStyles<typeof styles>
  & WithWidth;

const createProps: mapper<WorkflowMenuListProps, OwnState> = (props: WorkflowMenuListProps): OwnState => {
  const { request } = props.organizationWorkflowState.all;
  const { response: companyList } = props.lookupCompanyState.list;

  let companyUid: string = '';
  let dataCompany: ICompany = {
    uid: '',
    code: '',
    name: ''
  };

  if (request && request.filter) {
    companyUid = request.filter.companyUid || '';

    if (companyList && companyList.data) {
      const company = companyList.data.find(item => item.uid === (request.filter && request.filter.companyUid));

      if (company) {
        dataCompany = {
          uid: company.uid,
          code: company.code,
          name: company.name
        };
      }
    }
  }

  return {
    companyUid,
    dataCompany,
    isFilterOpen: companyUid === '' ? true : false,
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
  componentDidMount() {
    const {
      masterPage, intl, forceReload
    } = this.props;
    const { response, isLoading } = this.props.lookupMenuState.list;

    masterPage.changePage({
      uid: AppMenu.LookupWorkflow,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(organizationMessage.workflowSetup.page.listTitle),
      description: intl.formatMessage(organizationMessage.workflowSetup.page.listSubHeader)
    });

    if ((!response && !isLoading) || forceReload) {
      loadData(this.props);
    }

    const { response: companyList } = this.props.lookupCompanyState.list;
    const { loadListRequest: loadCompany } = this.props.lookupCompanyDispatch;

    if (!companyList) {
      loadCompany({});
    }
  },
  componentWillUnmount() {
    this.props.masterPage.resetPage();
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
  withLookupCompany,
  withMasterPage,
  injectIntl,
  withOrganizationWorkflow,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(WorkflowMenuListView);