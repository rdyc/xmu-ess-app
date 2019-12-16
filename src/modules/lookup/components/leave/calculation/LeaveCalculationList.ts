import { IEmployeeListFilter } from '@account/classes/filters/IEmployeeListFilter';
import { DirectionType } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithLeaveCalculation, withLeaveCalculation } from '@lookup/hoc/withLeaveCalculation';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LeaveCalculationListView } from './LeaveCalculationListView';
import { ILeaveFilterResult } from './LeaveFilter';

interface IOwnHandlers {
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILeaveFilterResult) => void;
  handleOnLoadApi: () => void;
  handleFindEmployee: () => void;
}

interface IOwnState extends ILeaveFilterResult {
  orderBy: string | undefined;
  direction?: DirectionType;
  page: number;
  size: number;
  find: string | undefined;
  isFilterOpen: boolean;
  filterEmployee?: IEmployeeListFilter;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateNext: StateHandler<IOwnState>;
  statePrevious: StateHandler<IOwnState>;
  stateSorting: StateHandler<IOwnState>;
  stateSizing: StateHandler<IOwnState>;
  statePage: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;
}

export type LeaveCalculationListProps = 
  WithLeaveCalculation &
  WithUser &
  WithLayout &
  WithMasterPage &
  RouteComponentProps &
  InjectedIntlProps &
  IOwnHandlers &
  IOwnState &
  IOwnStateUpdaters;

const createProps: mapper<LeaveCalculationListProps, IOwnState> = (props: LeaveCalculationListProps): IOwnState => {
  const { request } = props.leaveCalculationState.all;

  const state: IOwnState = {
    companyUid: request && request.companyUid || '',
    year: request && request.year || 0,
    find: request && request.filter && request.filter.find || undefined,
    isFilterOpen: !Boolean(request && request.companyUid && request.year) || true,
    page: request && request.filter && request.filter.page || 1,
    size: request && request.filter && request.filter.size || 10,
    direction: request && request.filter && request.filter.direction || 'ascending',
    orderBy: request && request.filter && request.filter.orderBy || '',
  };

  return state;
};

const stateUpdaters: StateUpdaters<LeaveCalculationListProps, IOwnState, IOwnStateUpdaters> = {
  stateNext: (prevState: IOwnState) => () => ({
    page: prevState.page + 1
  }),
  statePrevious: (prevState: IOwnState) => () => ({
    page: prevState.page - 1
  }),
  stateSorting: (prevState: IOwnState) => (direction: DirectionType) => ({
    direction,
    page: 1
  }),
  stateSizing: (prevState: IOwnState) => (size: number) => ({
    size,
    page: 1
  }),
  statePage: (prevState: IOwnState) => (page: number) => ({
    page
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: ILeaveFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false,
    filterEmployee: {
      isActive: true,
      orderBy: 'fullName',
      direction: 'ascending',
      companyUids: filter.companyUid
    }
  }),
};

const handlerCreators: HandleCreators<LeaveCalculationListProps, IOwnHandlers> = {
  handleGoToNext: (props: LeaveCalculationListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: LeaveCalculationListProps) => () => {
    props.statePrevious();
  },
  handleChangeSize: (props: LeaveCalculationListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: LeaveCalculationListProps) => (
    direction: boolean
  ) => {
    props.stateSorting(direction ? 'descending' : 'ascending');
  },
  handleFindEmployee: (props: LeaveCalculationListProps) => () => {

  },
  handleChangePage: (props: LeaveCalculationListProps) => (page: number) => {
    props.statePage(page);
  },
  handleOnLoadApi: (props: LeaveCalculationListProps) => () => {
    const { direction, orderBy, size, find, page, year, companyUid } = props;
    const { user } = props.userState;
    // const { isLoading, isExpired } = props.leaveCalculationState.all;
    const { loadAllRequest } = props.leaveCalculationDispatch;

    if (user) {
      loadAllRequest({
        companyUid,
        year,
        filter: {
          direction,
          orderBy,
          find,
          page,
          size,
        }
      });
    }
  },
  handleFilterVisibility: (props: LeaveCalculationListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LeaveCalculationListProps) => (filter: ILeaveFilterResult) => {
    props.setFilterApplied(filter);
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveCalculationListProps, IOwnState> = {
  componentDidMount() {
    // const {
    //   intl, companyUid, year
    // } = this.props;

    // const { isLoading, response } = this.props.leaveCalculationState.all;

    // this.props.masterPage.changePage({
    //   uid: AppMenu.LookupEmployeeLeave,
    //   parentUid: AppMenu.Lookup,
    //   title: intl.formatMessage(lookupMessage.calculation.page.title),
    //   description: intl.formatMessage(lookupMessage.calculation.page.subHeader)
    // });

    // // only load data when response are empty
    // if (!isLoading && !response) {
    //   if (companyUid !== '' && year !== 0) {
    //     loadData(this.props);
    //   }
    // }
  },
  componentDidUpdate(prevProps: LeaveCalculationListProps) {
 
    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        year: this.props.year,
        companyUid: this.props.companyUid,
        direction: this.props.direction,
        orderBy: this.props.orderBy,
        find: this.props.find,
        page: this.props.page,
        size: this.props.size
      },
      {
        year: prevProps.year,
        companyUid: prevProps.companyUid,
        direction: prevProps.direction,
        orderBy: prevProps.orderBy,
        find: prevProps.find,
        page: prevProps.page,
        size: prevProps.size
      }
    );

    if (isFilterChanged) {
      this.props.handleOnLoadApi();
    }
  }
};

export const LeaveCalculationList = compose(
  withLeaveCalculation,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveCalculationListView);
