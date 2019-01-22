import { IEmployeeTrainingList } from '@account/classes/response/employeeTraining';
import { AccountEmployeeTrainingFormData } from '@account/components/editor/form/training/AccountEmployeeTrainingContainerForm';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeTrainingView } from './AccountEmployeeTrainingView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  isReload: boolean | false;
  trainingUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  trainingItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeTrainingFormData;

  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (education: IEmployeeTrainingList, index: number) => void;
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

export type AccountEmployeeTrainingProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeTraining;

const createProps: mapper<AccountEmployeeTrainingProps, OwnState> = (props: AccountEmployeeTrainingProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeTrainingState.all;
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

const handlerCreators: HandleCreators<AccountEmployeeTrainingProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeTrainingProps) => (information: IEmployeeTrainingList, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      trainingUid: information.uid,
      isOpenMenu: true,
      trainingItemIndex: index,
      initialValues: {
        information: {
          uid: information.uid,
          employeeUid: props.match.params.employeeUid,
          name: information.name,
          start: information.start,
          end: information.end,
          organizer: information.organizer,
          trainingType: information.trainingType,
          certificationType: information.certificationType
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeTrainingProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      trainingUid: undefined,
      isOpenMenu: false,
      trainingItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeTrainingProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeTrainingProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
      trainingUid: undefined,
      initialValues: {
        information: {
          uid: undefined,
          employeeUid: props.match.params.employeeUid,
          name: undefined,
          start: undefined,
          end: undefined,
          organizer: undefined,
          trainingType: undefined,
          certificationType: undefined
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeTrainingProps) => (action: EditAction) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
    });
  },
  handleReload: (props: AccountEmployeeTrainingProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeTrainingProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeTrainingProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeTrainingProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeTrainingProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeTrainingProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeTrainingProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeTrainingDispatch;
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

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeTraining,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeTrainingProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeTrainingProps, OwnState>(lifecycles)
)(AccountEmployeeTrainingView);