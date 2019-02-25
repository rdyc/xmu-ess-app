import { IEmployeeAccess } from '@account/classes/response/employeeAccess';
import { AccountEmployeeAccessFormData } from '@account/components/editor/form/access/AccountEmployeeAccessForm';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeAccessView } from './AccountEmployeeAccessView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode?: FormMode;
  isOpenMenu: boolean;
  isOpenDialog: boolean;
  accessUid?: string;
  accessIndex?: string;
  initialValues?: AccountEmployeeAccessFormData;
  isReload: boolean | false;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleMenuOpen: (access: IEmployeeAccess, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (formMode: FormMode) => void;
  handleReload: () => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
}

export type AccountEmployeeAccessProps
  = RouteComponentProps<OwnRouteParams>
  & OwnStateUpdaters
  & OwnHandlers
  & OwnState
  & WithUser
  & WithLayout
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccess;

const handlerCreators: HandleCreators<AccountEmployeeAccessProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeAccessProps) => (access: IEmployeeAccess, index: number) => {
    props.stateUpdate({
      accessUid: access.uid,
      isOpenMenu: true,
      accessIndex: index,
      initialValues: {
        information: {
          uid: access.uid,
          companyUid: access.companyUid,
          positionUid: access.positionUid,
          roleUid: access.roleUid,
          unitType: access.unitType,
          departmentType: access.departmentType,
          levelType: access.levelType,
          start: access.start,
          end: access.end,
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeAccessProps) => () => {
    props.stateUpdate({
      accessUid: undefined,
      isOpenDialog: false,
      isOpenMenu: false,
      formMode: undefined,
      initialValues: {
        information: {
          uid: undefined,
          companyUid: undefined,
          positionUid: undefined,
          roleUid: undefined,
          unitType: undefined,
          departmentType: undefined,
          levelType: undefined,
          start: undefined,
          end: null,
        },
      },
    });
  },
  handleDialogClose: (props: AccountEmployeeAccessProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      accessUid: undefined,
      isOpenDialog: false,
      formMode: undefined,
      siteItemIndex: undefined,
      initialValues: {
        information: {
          uid: undefined,
          companyUid: undefined,
          positionUid: undefined,
          roleUid: undefined,
          unitType: undefined,
          departmentType: undefined,
          levelType: undefined,
          start: undefined,
          end: null,
        },
      },
    });
  },
  handleNew: (props: AccountEmployeeAccessProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      accessUid: undefined,
      initialValues: {
        information: {
          uid: undefined,
          companyUid: undefined,
          positionUid: undefined,
          roleUid: undefined,
          unitType: undefined,
          departmentType: undefined,
          levelType: undefined,
          start: undefined,
          end: null,
        },
      },
    });
  },
  handleEdit: (props: AccountEmployeeAccessProps) => (formMode: FormMode) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode,
      isOpenDialog: true,
      isOpenMenu: false,
    });
  },
  handleReload: (props: AccountEmployeeAccessProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeAccessProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeAccessProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeAccessProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeAccessProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const createProps: mapper<AccountEmployeeAccessProps, OwnState> = (props: AccountEmployeeAccessProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeAccessState.all;

  return {
    isOpenMenu: false,
    isOpenDialog: false,
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeAccessProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeAccessProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeAccessDispatch;
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

export const AccountEmployeeAccess = compose<AccountEmployeeAccessProps, {}>(
  withUser,
  withLayout,
  injectIntl,
  withAccountEmployeeAccess,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeAccessProps, OwnState>(lifecycles),
)(AccountEmployeeAccessView);