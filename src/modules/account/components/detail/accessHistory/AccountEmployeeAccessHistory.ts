import { WithAccountEmployeeAccessHistory, withAccountEmployeeAccessHistory } from '@account/hoc/withAccountEmployeeAccessHistory';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeAccessHistoryView } from './AccountEmployeeAccessHistoryView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  isReload: boolean | false;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleReload: () => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeAccessHistoryProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeAccessHistory;

const createProps: mapper<AccountEmployeeAccessHistoryProps, OwnState> = (props: AccountEmployeeAccessHistoryProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeAccessHistoryState.all;

  return {
    isReload: false,
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AccountEmployeeAccessHistoryProps, OwnHandlers> = {
  handleReload: (props: AccountEmployeeAccessHistoryProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },
  handleGoToNext: (props: AccountEmployeeAccessHistoryProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeAccessHistoryProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeAccessHistoryProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeAccessHistoryProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessHistoryProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeAccessHistoryProps, state: OwnState) {
    if (
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(props);
    }
    if (props.isReload) {
      loadData(props);

      props.stateUpdate({
        isReload: false
      });
    }
  }
};

const loadData = (props: AccountEmployeeAccessHistoryProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeAccessHistoryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      employeeUid: props.match.params.employeeUid,
      filter: {
        page,
        size,
        direction: 'ascending',
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });    
  }
};

export const AccountEmployeeAccessHistory = compose<AccountEmployeeAccessHistoryProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeAccessHistory,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessHistoryProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeAccessHistoryProps, OwnState>(lifecycles)
)(AccountEmployeeAccessHistoryView);