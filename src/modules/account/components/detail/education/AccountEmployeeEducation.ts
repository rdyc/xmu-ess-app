import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { AccountEmployeeEducationFormData } from '@account/components/editor/form/education/AccountEmployeeEducationContainer';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeEducationView } from './AccountEmployeeEducationView';

type EditAction = 'update' | 'delete';

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
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeEducationFormData;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (education: IEmployeeEducation, index: number) => void;
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

export type AccountEmployeeEducationProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeEducation;

const createProps: mapper<AccountEmployeeEducationProps, OwnState> = (props: AccountEmployeeEducationProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeEducationState.all;
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

const handlerCreators: HandleCreators<AccountEmployeeEducationProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeEducationProps) => (education: IEmployeeEducation, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      educationUid: education.uid,
      isOpenMenu: true,
      educationItemIndex: index,
      initialValues: {
        education: {
          uid: education.uid,
          employeeUid: props.match.params.employeeUid,
          degreeType: education.degreeType,
          institution: education.institution,
          major: education.major,
          start: education.start,
          end: education.end
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeEducationProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      educationUid: undefined,
      isOpenMenu: false,
      educationItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeEducationProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeEducationProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
      educationUid: undefined,
      initialValues: {
        education: {
          uid: undefined,
          employeeUid: props.match.params.employeeUid,
          degreeType: undefined,
          institution: undefined,
          major: undefined,
          start: undefined,
          end: undefined
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeEducationProps) => (action: EditAction) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
    });
  },
  handleReload: (props: AccountEmployeeEducationProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeEducationProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeEducationProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeEducationProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeEducationProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeEducationProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeEducationProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeEducationDispatch;
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

export const AccountEmployeeEducation = compose<AccountEmployeeEducationProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeEducation,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeEducationProps, OwnState>(lifecycles)
)(AccountEmployeeEducationView);