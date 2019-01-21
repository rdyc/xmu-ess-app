import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeEducationView } from './AccountEmployeeEducationView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  dialog: boolean;
  uid: string | undefined;
}

interface OwnHandlers {
  handleDialog: () => void;
  handleModify: (uid: string) =>  void;
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
  & WithStyles<typeof styles>
  & WithAccountEmployeeEducation;

const createProps: mapper<AccountEmployeeEducationProps, OwnState> = (props: AccountEmployeeEducationProps): OwnState => {
  return {
    dialog: false,
    uid: undefined
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AccountEmployeeEducationProps, OwnHandlers> = {
  handleDialog: (props: AccountEmployeeEducationProps) => () => {
    props.stateUpdate({
      dialog: !props.dialog
    });
  },
  handleModify: (props: AccountEmployeeEducationProps) => (uid: string) => {
    props.stateUpdate({
      uid,
      dialog: !props.dialog
    });
  }
};

export const AccountEmployeeEducation = compose<AccountEmployeeEducationProps, {}>(
  withUser,
  withRouter,
  injectIntl,
  withAccountEmployeeEducation,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeEducationProps, OwnHandlers>(handlerCreators)
)(AccountEmployeeEducationView);