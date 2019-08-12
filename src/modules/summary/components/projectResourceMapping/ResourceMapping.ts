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

export interface IResourceMappingChartSummary {
  employee: IAccountEmployee;
  projects: ISummaryMappingProject[];
}

interface IOwnState extends IResourceMappingFilterResult {
  isAdmin: boolean;
  reloadData: boolean;

  // Detail open
  isDetailOpen: boolean;
  isDetailSumOpen: boolean;
  isEmployeeOpen: boolean;

  // filter
  isFilterOpen: boolean;
  isSummary: boolean;

  // data chart
  chartData?: IResourceMappingChart;
  chartSummary?: IResourceMappingChartSummary;

  // data storage?
  employeeData?: IAccountEmployee;
}

interface IOwnHandlers {
  // detail and reload handler
  handleOpenDetail: () => void;
  handleOpenEmployee: () => void;
  handleReloadData: () => void;
  handleOpenDetailSum: () => void;

  // filter
  handleChangeFilter: (filter: IResourceMappingFilterResult) => void;

  // data handler from chart
  handleChartData: (data: any) => void;
  handleChartSummaryData: (data: any) => void;
  handleEmployeeData: (data: any) => void;

  // filter
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setSummary: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
}

export type ResourceMappingProps = WithSummary &
  WithWidth &
  WithUser &
  WithOidc &
  WithMasterPage &
  WithLayout &
  RouteComponentProps &
  InjectedIntlProps &
  IOwnState &
  IOwnHandlers &
  IOwnStateUpdaters &
  WithStyles<typeof styles>;

const createProps: mapper<ResourceMappingProps, IOwnState> = (
  props: ResourceMappingProps
): IOwnState => {
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
  const state: IOwnState = {
    isAdmin,
    reloadData: false,

    isDetailOpen: false,
    isEmployeeOpen: false,
    isDetailSumOpen: false,
    
    isSummary: false,
    companyUid: '',
    year: undefined,
    
    chartData: undefined,
    isFilterOpen: true,
  };

  if (request && request.filter) {
    state.isFilterOpen = false,
    state.companyUid = request.filter.companyUid,
    state.year = request.filter.year,
    state.competencyTypes = request.filter.competencyTypes,
    state.professionTypes = request.filter.professionTypes,
    state.employeeUids = request.filter.employeeUids;
  }

  return state;
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: () => (filter: IResourceMappingFilterResult) => ({
    ...filter,
    isFilterOpen: false
  }),
  setSummary: () => (checked: boolean) => ({
    isSummary: checked
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
};

const handlerCreators: HandleCreators<ResourceMappingProps, IOwnHandlers> = {
  handleFilterVisibility: (props: ResourceMappingProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },
  handleChangeFilter: (props: ResourceMappingProps) => (
    filter: IResourceMappingFilterResult
  ) => {
    props.setFilterApplied(filter);
    filter.summary ? props.setSummary(true) : props.setSummary(false);
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
  handleOpenDetailSum: (props: ResourceMappingProps) => () => {
    props.stateUpdate({
      isDetailSumOpen: !props.isDetailSumOpen
    });
  },
  handleOpenEmployee: (props: ResourceMappingProps) => () => {
    props.stateUpdate({
      isEmployeeOpen: !props.isEmployeeOpen,
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
  },
  handleChartSummaryData: (props: ResourceMappingProps) => (data: any) => {
    props.stateUpdate({
      chartSummary: {
        employee: data.employee,
        projects: data.projects
      },
      isDetailSumOpen: !props.isDetailSumOpen
    });
  },
  handleEmployeeData: (props: ResourceMappingProps) => (data: any) => {
    props.stateUpdate({
      employeeData: data.employee,
      isEmployeeOpen: !props.isEmployeeOpen
    });
  },
  // handleSummary: (props: ResourceMappingProps) => (checked: boolean) => {
  //   props.setSummary(checked);
  // },
  // handleSummaryData: (props: ResourceMappingProps) => (data: ISummaryMapping[]) => {
  //   const tempData: IResourceMappingSummary[] = [];
  //   data.map((item, itemIdx) => {
  //     if (item.projects && item.projects.length > 0) {
  //       let counter: number = 0;
  //       let start: string = '';
  //       let end: string = '';
  //       item.projects.map((project, index) => {
  //         if (index === 0) {
  //           start = project.start;
  //           end = project.end;
  //           tempData.push({
  //             employee: item.employee,
  //             summary: [{
  //               start,
  //               end,
  //               projects: [project]
  //             }]
  //           });
  //         } else {
  //           start = tempData[itemIdx].summary[counter].start;
  //           end = tempData[itemIdx].summary[counter].end;
  //           if (moment(project.start).isBetween(start, end)) {
  //             if (moment(project.end).isAfter(end)) {
  //               tempData[itemIdx].summary[counter].end = project.end;
  //             }
  //             tempData[itemIdx].summary[counter].projects.push(project);
  //           } else {
  //             start = project.start;
  //             end = project.end;
  //             tempData[itemIdx].summary.push({
  //               start,
  //               end,
  //               projects: [project]
  //             });
  //             counter += 1;
  //           }
  //         }
  //       });
  //     } else {
  //       tempData.push({
  //         employee: item.employee,
  //         summary: []
  //       });
  //     }
  //   });
  //   props.setSummaryData(tempData);
  // },
};

const lifecycles: ReactLifeCycleFunctions<ResourceMappingProps, IOwnState> = {
  componentDidMount() {
    const { intl, companyUid, year } = this.props;

    const { isLoading, response } = this.props.summaryState.mapping;

    this.props.masterPage.changePage({
      uid: AppMenu.ReportResourceMapping,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.mapping.page.title),
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      if (companyUid && year) {
        loadData(this.props);
      }
    }
  },
  componentWillUpdate(nextProps: ResourceMappingProps) {
    if (
      this.props.companyUid !== nextProps.companyUid ||
      this.props.year !== nextProps.year ||
      this.props.professionTypes !== nextProps.professionTypes ||
      this.props.competencyTypes !== nextProps.competencyTypes || 
      this.props.employeeUids !== nextProps.employeeUids
    ) {
      loadData(nextProps);
    }
    if (nextProps.reloadData) {
      loadData(nextProps);

      nextProps.stateUpdate({
        reloadData: false
      });
    }
  },
  componentWillUnmount() {
    const { masterPage } = this.props;

    masterPage.resetPage();
  }
};

const loadData = (props: ResourceMappingProps): void => {
  const { companyUid, year, competencyTypes, professionTypes, employeeUids } = props;
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
        professionTypes,
        competencyTypes,
        employeeUids,
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
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ResourceMappingProps, IOwnHandlers>(handlerCreators),
  lifecycle<ResourceMappingProps, IOwnState>(lifecycles)
)(ResourceMappingView);
