import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WinningRatioView } from '@summary/components/winningRatio/WinningRatioView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import * as moment from 'moment';
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
  withStateHandlers
} from 'recompose';

interface OwnHandlers {
  handleChangeStart: (start: string) => void;
  handleChangeEnd: (end: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleDialog: () => void;
  handleDetail: (uid: string, type: string) => void;
  
  handleChangeFind: (find: string) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
  find?: string | undefined;
  findBy?: string | undefined;
  uid?: string | undefined;
  open?: boolean;
  type?: string | undefined;
}

interface OwnState {
  start: string;
  end: string;
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
  find: string | undefined;
  findBy: string | undefined;
  uid: string | undefined;
  open: boolean;
  type: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateStart: StateHandler<OwnState>;
  stateEnd: StateHandler<OwnState>;
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
  statePage: StateHandler<OwnState>;
  stateDetail: StateHandler<OwnState>;
  stateDialog: StateHandler<OwnState>;

  stateFind: StateHandler<OwnState>;
}

export type WinningRatioProps =
  & WithLayout
  & WithUser
  & WithSummary
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters;

const createProps: mapper<WinningRatioProps, OwnState> = (props: WinningRatioProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.winning;

  return {
    start: moment()
      .startOf('year')
      .toISOString(true),
    end: moment().toISOString(true),
    find: undefined,
    findBy: undefined,
    uid: undefined,
    open: false,
    type: undefined,
    orderBy:
      (request && request.filter && request.filter.orderBy) || orderBy || 'fullName',
    direction:
      (request && request.filter && request.filter.direction) ||
      direction ||
      'ascending',
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 5
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateStart: (prevState: OwnState) => (start: string) => ({
    start
  }),
  stateEnd: (prevState: OwnState) => (end: string) => ({
    end
  }),
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1
  }),
  stateSorting: (prevState: OwnState) => (direction: string) => ({
    direction,
    page: 1
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1
  }),
  statePage: (prevState: OwnState) => (page: number) => ({
    page
  }),
  stateDetail: (prevState: OwnState) => (uid: string, type: string) => ({
    uid,
    type
  }),
  stateDialog: (prevState: OwnState) => (open: boolean) => ({
    open
  }),

  stateFind: (prevState: OwnState) => (find: string) => ({
    find,
    findBy: 'fullName'
  }),
};

const handlerCreators: HandleCreators<WinningRatioProps, OwnHandlers> = {
  handleChangeStart: (props: WinningRatioProps) => (start: string) => {
    props.stateStart(start);
  },
  handleChangeEnd: (props: WinningRatioProps) => (end: string) => {
    props.stateEnd(end);
  },
  handleGoToNext: (props: WinningRatioProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: WinningRatioProps) => () => {
    props.statePrevious();
  },
  handleChangeSize: (props: WinningRatioProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleChangeSort: (props: WinningRatioProps) => (
    direction: boolean
  ) => {
    props.stateSorting(direction ? 'descending' : 'ascending');
  },
  handleChangePage: (props: WinningRatioProps) => (page: number) => {
    props.statePage(page);
  },
  handleDetail: (props: WinningRatioProps) => (uid: string, type: string) => {
    props.stateDetail(uid, type);
  },
  handleDialog: (props: WinningRatioProps) => () => {
    let { open } = props;
    
    open = !open;
    props.stateDialog(open);
  },
  handleChangeFind: (props: WinningRatioProps) => (find: string) => {
    props.stateFind(find.toUpperCase());
  },
};

const lifecycles: ReactLifeCycleFunctions<WinningRatioProps, OwnState> = {
  componentDidMount() {
    const {
      layoutDispatch,
      intl
    } = this.props;
    
    const { isLoading, response } = this.props.summaryState.winning;

    layoutDispatch.changeView({
      uid: AppMenu.ReportProgress,
      parentUid: AppMenu.Report,
      title: intl.formatMessage({ id: 'summary.winningRatio.title' }),
      subTitle: intl.formatMessage({ id: 'summary.winningRatio.subTitle' })
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: WinningRatioProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.start !== props.start ||
      this.props.end !== props.end ||
      this.props.find !== props.find
    ) {
      const { loadWinningDispose } = this.props.summaryDispatch;

      loadWinningDispose();
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadWinningDispose } = this.props.summaryDispatch;

    layoutDispatch.changeView(null);

    // dispose 'get all' from 'redux store' when the page is 'out of report winning' context
    if (view && view.parentUid !== AppMenu.Report) {
      loadWinningDispose();
    }
  }
};

const loadData = (props: WinningRatioProps): void => {
  const { orderBy, direction, size, start, end, find, findBy, page } = props;
  // let { page } = props;
  const { user } = props.userState;
  const { loadWinningRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;
  
  // page += 1;
  
  if (user) {
    loadWinningRequest({
      companyUid: user.company.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        start,
        end,
        find,
        findBy
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const WinningRatio = compose<WinningRatioProps, OwnOptions>(
  withSummary,
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(
    createProps,
    stateUpdaters
  ),
  withHandlers<WinningRatioProps, OwnHandlers>(handlerCreators),
  lifecycle<WinningRatioProps, OwnState>(lifecycles)
)(WinningRatioView);
