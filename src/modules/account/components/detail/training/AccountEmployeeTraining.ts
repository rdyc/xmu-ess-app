import { IEmployeeTrainingList } from '@account/classes/response/employeeTraining';
import { AccountEmployeeTrainingFormData } from '@account/components/editor/form/training/AccountEmployeeTrainingContainerForm';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeTrainingView } from './AccountEmployeeTrainingView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  trainingUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  trainingItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeTrainingFormData;
}

interface OwnHandlers {
  handleMenuOpen: (education: IEmployeeTrainingList, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (editAction: EditAction) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeTrainingProps
  = WithUser
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeTraining;

const createProps: mapper<AccountEmployeeTrainingProps, OwnState> = (props: AccountEmployeeTrainingProps): OwnState => {
  return {
    formMode: undefined,
    editAction: undefined,
    isOpenDialog: false,
    isOpenMenu: false
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
          certificatonType: undefined
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
};

export const AccountEmployeeTraining = compose<AccountEmployeeTrainingProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeTraining,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeTrainingProps, OwnHandlers>(handlerCreators)
)(AccountEmployeeTrainingView);