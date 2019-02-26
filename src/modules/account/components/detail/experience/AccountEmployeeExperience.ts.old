import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { AccountEmployeeExperienceFormData } from '@account/components/editor/form/experience/AccountEmployeeExperienceContainer';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeExperienceView } from './AccountEmployeeExperienceView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  isReload: boolean | false;
  experienceUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  experienceItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeExperienceFormData;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (experience: IEmployeeExperience, index: number) => void;
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

export type AccountEmployeeExperienceProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeExperience;

const createProps: mapper<AccountEmployeeExperienceProps, OwnState> = (props: AccountEmployeeExperienceProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeExperienceState.all;

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

const handlerCreators: HandleCreators<AccountEmployeeExperienceProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeExperienceProps) => (experience: IEmployeeExperience, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      experienceUid: experience.uid,
      isOpenMenu: true,
      experienceItemIndex: index,
      initialValues: {
        experience: {
          uid: experience.uid,
          employeeUid: props.match.params.employeeUid,
          company: experience.company,
          position: experience.position,
          start: experience.start,
          end: experience.end
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeExperienceProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      experienceUid: undefined,
      isOpenMenu: false,
      experienceItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeExperienceProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeExperienceProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
      experienceUid: undefined,
      initialValues: {
        experience: {
          uid: undefined,
          employeeUid: props.match.params.employeeUid,
          company: undefined,
          position: undefined,
          start: undefined,
          end: undefined
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeExperienceProps) => (action: EditAction) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
    });
  },
  handleReload: (props: AccountEmployeeExperienceProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeExperienceProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeExperienceProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeExperienceProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeExperienceProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeExperienceProps, state: OwnState) {
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

const loadData = (props: AccountEmployeeExperienceProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeExperienceDispatch;
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

export const AccountEmployeeExperience = compose<AccountEmployeeExperienceProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeExperience,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeExperienceProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeExperienceProps, OwnState>(lifecycles)
)(AccountEmployeeExperienceView);