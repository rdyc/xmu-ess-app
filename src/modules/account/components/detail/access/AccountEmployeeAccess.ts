import { WithAccountEmployeeAccess, withAccountEmployeeAccess } from '@account/hoc/withAccountEmployeeAccess';
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
  isOpenMenu: boolean;
  accessUid?: string;
  accessIndex?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleMenuOpen: (accessUid: string, index: number) => void;
  handleMenuClose: () => void;
}

export type AccountEmployeeAccessProps
  = RouteComponentProps<OwnRouteParams>
  & OwnStateUpdaters
  & OwnState
  & WithUser
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & WithAccountEmployeeAccess;

const handlerCreators: HandleCreators<AccountEmployeeAccessProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeAccessProps) => (accessUid: string, index: number) => {
    props.stateUpdate({
      accessUid,
      isOpenMenu: true,
      accessIndex: index,
    });
  },
  handleMenuClose: (props: AccountEmployeeAccessProps) => () => {
    props.stateUpdate({
      isOpenMenu: false,
      siteItemIndex: undefined,
    });
  },
};

const createProps: mapper<AccountEmployeeAccessProps, OwnState> = (props: AccountEmployeeAccessProps): OwnState => {
  return {
    isOpenMenu: false,
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