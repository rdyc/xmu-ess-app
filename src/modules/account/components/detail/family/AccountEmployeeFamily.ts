import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { AccountEmployeeFamilyFormData } from '@account/components/editor/form/family/AccountEmployeeFamilyContainerForm';
import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeFamilyView } from './AccountEmployeeFamilyView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  isReload: boolean | false;
  familyUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  familyItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeFamilyFormData;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (family: IEmployeeFamily, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (editAction: EditAction) => void;
  handleReload: () => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeFamilyProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeFamily;

const createProps: mapper<AccountEmployeeFamilyProps, OwnState> = (props: AccountEmployeeFamilyProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeFamilyState.all;

  return {
    formMode: undefined,
    editAction: undefined,
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

const handlerCreators: HandleCreators<AccountEmployeeFamilyProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeFamilyProps) => (family: IEmployeeFamily, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      familyUid: family.uid,
      isOpenMenu: true,
      familyItemIndex: index,
      initialValues: {
        family: {
          uid: family.uid,
          employeeUid: props.match.params.employeeUid,
          familyType: family.familyType,
          fullName: family.fullName,
          genderType: family.genderType,
          birthPlace: family.birthPlace,
          birthDate: family.birthDate
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeFamilyProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      familyUid: undefined,
      isOpenMenu: false,
      familyItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeFamilyProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeFamilyProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
      familyUid: undefined,
      initialValues: {
        family: {
          uid: undefined,
          employeeUid: props.match.params.employeeUid,
          familyType: undefined,
          fullName: undefined,
          genderType: undefined,
          birthPlace: undefined,
          birthDate: undefined
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeFamilyProps) => (action: EditAction) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
    });
  },
  handleReload: (props: AccountEmployeeFamilyProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeFamilyProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeFamilyProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeFamilyProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeFamilyProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeFamilyProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeFamilyProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeFamilyDispatch;
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

export const AccountEmployeeFamily = compose<AccountEmployeeFamilyProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withAccountEmployeeFamily,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeFamilyProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeFamilyProps, OwnState>(lifecycles),
)(AccountEmployeeFamilyView);