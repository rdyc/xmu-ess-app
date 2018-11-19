import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { TimesheetField } from '@timesheet/classes/types';
import { TimesheetEntryListView } from '@timesheet/components/entry/list/TimesheetEntryListView';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
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

interface OwnHandlers {
  handleGoToDetail: (timesheetUid: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: ICollectionValue) => void;
  handleChangeSort: (direction: SortDirection) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface OwnState {
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type EntryListProps
  = WithTimesheetEntry
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<EntryListProps, OwnState> = (props: EntryListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.timesheetState.all;

  return {
    orderBy: request && request.filter && request.filter.orderBy || orderBy || 'uid',
    direction: request && request.filter && request.filter.direction || direction || 'descending',
    page: request && request.filter && request.filter.page || page || 1,
    size: request && request.filter && request.filter.size || size || 10,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1,
  }),
  stateReloading: (prevState: OwnState) => () => ({
    page: 1,
  }),
  stateOrdering: (prevState: OwnState) => (field: ICollectionValue) => ({
    orderBy: field.value,
    page: 1,
  }),
  stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
    direction,
    page: 1,
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
  }),
};

const handlerCreators: HandleCreators<EntryListProps, OwnHandlers> = {
  handleGoToDetail: (props: EntryListProps) => (timesheetUid) => {
    const { history } = props;
    const { isLoading } = props.timesheetState.all;

    if (!isLoading) {
      history.push(`/timesheet/entry/${timesheetUid}`);
    }
  },
  handleGoToNext: (props: EntryListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: EntryListProps) => () => {
    props.statePrevious();
  },
  handleReloading: (props: EntryListProps) => () => {
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: EntryListProps) => (field: ICollectionValue) => {
    props.stateOrdering(field);
  },
  handleChangeSize: (props: EntryListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: EntryListProps) => (direction: SortDirection) => {
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<EntryListProps, OwnState> = {
  componentDidMount() {
    const {
      handleGoToNext, handleGoToPrevious, handleReloading,
      handleChangeOrder, handleChangeSize, handleChangeSort,
      layoutDispatch, navBottomDispatch,
      history, intl
    } = this.props;

    const { isLoading, response } = this.props.timesheetState.all;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetHistory,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({ id: 'timesheet.history.title' }),
      subTitle: intl.formatMessage({ id: 'timesheet.subTitle' })
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/timesheet/entry'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(TimesheetField)
      .map(key => ({ value: key, name: TimesheetField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: EntryListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadAllDispose } = this.props.timesheetDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
    if (view && view.parentUid !== AppMenu.Timesheet) {
      loadAllDispose();
    }
  }
};

const loadData = (props: EntryListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.timesheetDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        isRejected: undefined,
        companyUid: undefined,
        find: undefined,
        findBy: undefined,
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const TimesheetEntryList = compose<EntryListProps, OwnOptions>(
  withTimesheetEntry,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters),
  withHandlers<EntryListProps, OwnHandlers>(handlerCreators),
  lifecycle<EntryListProps, OwnState>(lifecycles),
)(TimesheetEntryListView);