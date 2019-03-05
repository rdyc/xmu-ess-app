import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { DirectionType } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
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
  withStateHandlers,
} from 'recompose';

import { IWinningRatioFilterResult } from './WinningRatioFilter';
import { WinningRatioView } from './WinningRatioView';

interface OwnState extends IWinningRatioFilterResult {
  isAdmin: boolean;
  reloadData: boolean;
  uid: string | undefined;
  isDetailOpen: boolean;
  type: string | undefined;
  orderBy?: string | undefined;
  direction?: DirectionType;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleDialogDetail: () => void;
  handleGoToNext: () => void;
  handleReloadData: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
  handleChangeSort: (direction: boolean) => void;
  handleDetail: (uid: string, type: string) => void;
  handleChangeFilter: (filter: IWinningRatioFilterResult) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

export type WinningRatioProps = WithSummary &
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

const createProps: mapper<WinningRatioProps, OwnState> = (
  props: WinningRatioProps
): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.summaryState.winning;
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
    type: undefined,
    uid: undefined,
    companyUid: props.userState.user && props.userState.user.company.uid,
    start: moment()
      .startOf('year')
      .toISOString(true),
    end: moment().format('YYYY MM DD'),
    orderBy:
      (request && request.filter && request.filter.orderBy) ||
      orderBy ||
      'fullName',
    direction:
      (request && request.filter && request.filter.direction) ||
      direction ||
      'ascending',
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };

  if (request && request.filter) {
    state.companyUid = request.filter.companyUid,
    state.employeeUid = request.filter.employeeUid,
    state.start = request.filter.start,
    state.end = request.filter.end;
  }

  return state;
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: (prevState: OwnState) => (filter: IWinningRatioFilterResult) => ({
    ...filter,
    page: 1
  })
};

const handlerCreators: HandleCreators<WinningRatioProps, OwnHandlers> = {
  handleChangeFilter: (props: WinningRatioProps) => (
    filter: IWinningRatioFilterResult
  ) => {
    props.setFilterApplied(filter);
  },
  handleReloadData: (props: WinningRatioProps) => () => {
    props.stateUpdate({
      reloadData: true
    });
  },
  handleDialogDetail: (props: WinningRatioProps) => () => {
    props.stateUpdate({
      isDetailOpen: !props.isDetailOpen
    });
  },
  handleDetail: (props: WinningRatioProps) => (uid: string, type: string) => {
    props.stateUpdate({
      uid,
      type
    });
  },
  handleGoToNext: (props: WinningRatioProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: WinningRatioProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangeSize: (props: WinningRatioProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
  handleChangePage: (props: WinningRatioProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSort: (props: WinningRatioProps) => (direction: boolean) => {
    props.stateUpdate({
      direction: direction ? 'descending' : 'ascending'
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<WinningRatioProps, OwnState> = {
  componentDidMount() {
    const { intl } = this.props;

    const { isLoading, response } = this.props.summaryState.winning;

    this.props.masterPage.changePage({
      uid: AppMenu.ReportWinningRatio,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.winningRatio.page.title),
      description : intl.formatMessage(summaryMessage.winningRatio.page.subHeader)
    });

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentWillUpdate(props: WinningRatioProps, state: OwnState) {
    if (
      this.props.companyUid !== props.companyUid ||
      this.props.employeeUid !== props.employeeUid ||
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size ||
      this.props.start !== props.start ||
      this.props.end !== props.end
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
    const { loadWinningDispose } = this.props.summaryDispatch;

    masterPage.resetPage();

    loadWinningDispose();
  }
};

const loadData = (props: WinningRatioProps): void => {
  const { orderBy, direction, size, page, isAdmin } = props;
  const { user } = props.userState;
  const { loadWinningRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadWinningRequest({
      companyUid: isAdmin ? props.companyUid : user.company.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        companyUid: isAdmin ? props.companyUid : user.company.uid,
        employeeUid: props.employeeUid,
        start: props.start,
        end: props.end
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const WinningRatio = compose<WinningRatioProps, {}>(
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
  withHandlers<WinningRatioProps, OwnHandlers>(handlerCreators),
  lifecycle<WinningRatioProps, OwnState>(lifecycles)
)(WinningRatioView);
