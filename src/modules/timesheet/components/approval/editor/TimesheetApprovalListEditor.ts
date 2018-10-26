import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { TimesheetField } from '@timesheet/classes/types';
import { TimesheetApprovalListEditorView } from '@timesheet/components/approval/editor/TimesheetApprovalListEditorView';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
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
  handleChangeOrder: (field: IListBarField) => void;
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

export type ApprovalListEditorProps
  = WithTimesheetApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ApprovalListEditorProps, OwnState> = (props: ApprovalListEditorProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.timesheetApprovalState.all;

  return {
    orderBy: request && request.filter && request.filter['query.orderBy'] || orderBy,
    direction: request && request.filter && request.filter['query.direction'] || direction,
    page: request && request.filter && request.filter['query.page'] || page || 1,
    size: request && request.filter && request.filter['query.size'] || size || 10,
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
  stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
    orderBy: field.id,
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

const handlerCreators: HandleCreators<ApprovalListEditorProps, OwnHandlers> = {
  handleGoToDetail: (props: ApprovalListEditorProps) => (timesheetUid) => {
    const { history } = props;
    const { isLoading } = props.timesheetApprovalState.all;

    if (!isLoading) {
      history.push(`/approval/timesheet/details/${timesheetUid}`);
    }
  },
  handleGoToNext: (props: ApprovalListEditorProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: ApprovalListEditorProps) => () => {
    props.statePrevious();
  },
  handleReloading: (props: ApprovalListEditorProps) => () => {
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: ApprovalListEditorProps) => (field: IListBarField) => {
    props.stateOrdering(field);
  },
  handleChangeSize: (props: ApprovalListEditorProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: ApprovalListEditorProps) => (direction: SortDirection) => {
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<ApprovalListEditorProps, OwnState> = {
  componentDidMount() {
    const {
      handleGoToNext, handleGoToPrevious, handleReloading,
      handleChangeOrder, handleChangeSize, handleChangeSort,
      layoutDispatch, navBottomDispatch,
      history, intl
    } = this.props;

    const { isLoading, response } = this.props.timesheetApprovalState.all;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({ id: 'timesheet.approval.title' }),
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
      onAddCallback: () => history.push('/timesheet/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(TimesheetField)
      .map(key => ({ id: key, name: TimesheetField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: ApprovalListEditorProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.timesheetApprovalDispatch;

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

const loadData = (props: ApprovalListEditorProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.timesheetApprovalDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        'query.direction': direction,
        'query.orderBy': orderBy,
        'query.page': page,
        'query.size': size,
        status: 'pending',
        companyUid: undefined,
        'query.find': undefined,
        'query.findBy': undefined,
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const TimesheetApprovalListEditor = compose<ApprovalListEditorProps, OwnOptions>(
  withTimesheetApproval,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters),
  withHandlers<ApprovalListEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<ApprovalListEditorProps, OwnState>(lifecycles),
)(TimesheetApprovalListEditorView);