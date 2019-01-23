import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeEducationFormData } from '@account/components/editor/form/education/AccountEmployeeEducationContainer';
import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeRateView } from './AccountEmployeeRateView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  isReload: boolean | false;
  educationUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  educationItemIndex?: string | undefined;
  initialValues?: AccountEmployeeEducationFormData;

  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (rate: IEmployeeRate, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: () => void;
  handleReload: () => void;

  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeRateProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeRate;

const createProps: mapper<AccountEmployeeRateProps, OwnState> = (props: AccountEmployeeRateProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeRateState.all;
  return {
    formMode: undefined,
    isOpenDialog: false,
    isOpenMenu: false,
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

const handlerCreators: HandleCreators<AccountEmployeeRateProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeRateProps) => (rate: IEmployeeRate, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      rateUid: rate.uid,
      isOpenMenu: true,
      rateItemIndex: index,
      initialValues: {
        information: {
          employeeUid: props.match.params.employeeUid,
          value: rate.value
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeRateProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      rateUid: undefined,
      isOpenMenu: false,
      rateItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeRateProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeRateProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      rateUid: undefined,
      initialValues: {
        information: {
          employeeUid: props.match.params.employeeUid,
          value: undefined,
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeRateProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
    });
  },
  handleReload: (props: AccountEmployeeRateProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeRateProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeRateProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeRateProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeRateProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeRateProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeRateProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeRateDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      employeeUid: props.match.params.employeeUid,
      filter: {
        page,
        size,
        direction: 'descending',
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });    
  }
};

export const AccountEmployeeRate = compose<AccountEmployeeRateProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeRate,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeRateProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeRateProps, OwnState>(lifecycles)
)(AccountEmployeeRateView);