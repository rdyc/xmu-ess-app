import { IEmployeeAccessList } from '@account/classes/response/employeeAccess';
import { AccountEmployeeAccessFormData } from '@account/components/editor/form/access/AccountEmployeeAccessForm';
import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
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
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleMenuOpen: (access: IEmployeeAccessList, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (formMode: FormMode) => void;
}

export type AccountEmployeeAccessProps
  = RouteComponentProps<OwnRouteParams>
  & OwnStateUpdaters
  & OwnHandlers
  & OwnState
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccess;

const handlerCreators: HandleCreators<AccountEmployeeAccessProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeAccessProps) => (access: IEmployeeAccessList, index: number) => {
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
      isOpenMenu: false,
      formMode: undefined,
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
};

const createProps: mapper<AccountEmployeeAccessProps, OwnState> = (props: AccountEmployeeAccessProps): OwnState => {
  return {
    isOpenMenu: false,
    isOpenDialog: false,
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

export const AccountEmployeeAccess = compose<AccountEmployeeAccessProps, {}>(
  withUser,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeAccessProps, OwnHandlers>(handlerCreators),
  withStyles(styles),
  withAccountEmployeeAccess,
)(AccountEmployeeAccessView);