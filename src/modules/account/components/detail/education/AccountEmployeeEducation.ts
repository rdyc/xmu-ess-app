import { IEmployeeEducationList } from '@account/classes/response/employeeEducation';
import { AccountEmployeeEducationFormData } from '@account/components/editor/form/education/AccountEmployeeEducationContainer';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeEducationView } from './AccountEmployeeEducationView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  educationUid?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  educationItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeEducationFormData;
}

interface OwnHandlers {
  handleMenuOpen: (education: IEmployeeEducationList, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (editAction: EditAction) => void;

}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeEducationProps
  = WithUser
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeEducation;

const createProps: mapper<AccountEmployeeEducationProps, OwnState> = (props: AccountEmployeeEducationProps): OwnState => {
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

const handlerCreators: HandleCreators<AccountEmployeeEducationProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeEducationProps) => (education: IEmployeeEducationList, index: number) => {
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
};

export const AccountEmployeeEducation = compose<AccountEmployeeEducationProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeEducation,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationProps, OwnHandlers>(handlerCreators)
)(AccountEmployeeEducationView);