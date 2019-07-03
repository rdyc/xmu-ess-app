import { IAccountEmployee } from '@account/classes';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ISummaryMappingProject } from '@summary/classes/response/mapping';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
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

import { IResourceMappingFilterResult } from './ResourceMappingFilter';
import { ResourceMappingView } from './ResourceMappingView';

export interface IResourceMappingChart {
  employee: IAccountEmployee;
  project: ISummaryMappingProject;
}

interface OwnState extends IResourceMappingFilterResult {
  isAdmin: boolean;
  reloadData: boolean;
  isDetailOpen: boolean;
  isStartup: boolean;
  chartData?: IResourceMappingChart;
}

interface OwnHandlers {
  handleOpenDetail: () => void;
  handleReloadData: () => void;
  handleChangeFilter: (filter: IResourceMappingFilterResult) => void;
  handleChartData: (data: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

export type ResourceMappingProps = WithSummary &
  WithWidth &
  WithUser &
  WithOidc &
  WithMasterPage &
  WithLayout &
  RouteComponentProps &
  InjectedIntlProps &
  OwnState &
  OwnHandlers &
  OwnStateUpdaters &
  WithStyles<typeof styles>;

const createProps: mapper<ResourceMappingProps, OwnState> = (
  props: ResourceMappingProps
): OwnState => {
  const { request } = props.summaryState.mapping;
  const { user } = props.oidcState;
  let isAdmin: boolean = false;
  
  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  const state: OwnState = {
    isAdmin,
    reloadData: false,
    isDetailOpen: false,
    isStartup: true,
    chartData: undefined,
    companyUid: '',
    year: undefined,
  };

  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.year = request.filter.year;
  }

  return state;
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: (prevState: OwnState) => (filter: IResourceMappingFilterResult) => ({
    ...filter,
    page: 1
  })
};

const handlerCreators: HandleCreators<ResourceMappingProps, OwnHandlers> = {
  handleChangeFilter: (props: ResourceMappingProps) => (
    filter: IResourceMappingFilterResult
  ) => {
    props.setFilterApplied(filter);
    if (props.isStartup) {
      props.stateUpdate({
        isStartup: false
      });
    }
  },
  handleReloadData: (props: ResourceMappingProps) => () => {
    props.stateUpdate({
      reloadData: true
    });
  },
  handleOpenDetail: (props: ResourceMappingProps) => () => {
    props.stateUpdate({
      isDetailOpen: !props.isDetailOpen
    });
  },
  handleChartData: (props: ResourceMappingProps) => (data: any) => {
    props.stateUpdate({
      chartData: {
        employee: data.employee,
        project: data.project
      },
      isDetailOpen: !props.isDetailOpen
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<ResourceMappingProps, OwnState> = {
  componentDidMount() {
    const { intl, companyUid, year } = this.props;

    const { isLoading, response } = this.props.summaryState.mapping;

    this.props.masterPage.changePage({
      uid: AppMenu.ReportWinningRatio,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.mapping.page.title),
      description : intl.formatMessage(summaryMessage.mapping.page.subHeader)
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      if (companyUid && year) {
        loadData(this.props);
      }
    }
  },
  componentWillUpdate(props: ResourceMappingProps, state: OwnState) {
    if (
      this.props.companyUid !== props.companyUid ||
      this.props.year !== props.year
    ) {
      loadData(props);
    }
    if (props.reloadData) {
      loadData(props);

      props.stateUpdate({
        reloadData: false
      });
    }
  },
  componentWillUnmount() {
    const { masterPage } = this.props;
    const { loadMappingDispose } = this.props.summaryDispatch;

    masterPage.resetPage();

    loadMappingDispose();
  }
};

const loadData = (props: ResourceMappingProps): void => {
  const { companyUid, year } = props;
  const { user } = props.userState;
  const { loadMappingRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadMappingRequest({
      companyUid,
      year,
      filter: {
        companyUid,
        year,
        orderBy: 'fullName'
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const ResourceMapping = compose<ResourceMappingProps, {}>(
  withSummary,
  withUser,
  withOidc,
  withMasterPage,
  withLayout,
  withRouter,
  injectIntl,
  withWidth(),
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ResourceMappingProps, OwnHandlers>(handlerCreators),
  lifecycle<ResourceMappingProps, OwnState>(lifecycles)
)(ResourceMappingView);
