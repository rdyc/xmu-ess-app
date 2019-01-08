import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { AppUserManager } from '@utils/userManager';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as store from 'store';

import { NavigationHeaderView } from './NavigationHeaderView';

const formatInitial = (value: string): string => {
  let result = '';

  const split = value.split(' ');

  result = `${split[0].charAt(0).toUpperCase()}${split.length > 1 ? split[1].charAt(0).toUpperCase() : ''}`;

  return result.trim();
};

interface IOwnOption {
  headerUid?: string;
  onClickHeader: (headerUid: string) => void;
}

interface IOwnState {
  nameInitial?: string;
  isDialogAccessOpen: boolean;
  isDialogLogoutOpen: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setDialogAccess: StateHandler<IOwnState>;
  setDialogLogout: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnClickAccess: (event: React.MouseEvent) => void;
  handleOnClickAccessConfirmed: (event: React.MouseEvent) => void;
  handleOnClickLogout: (event: React.MouseEvent) => void;
  handleOnClickLogoutConfirmed: (event: React.MouseEvent) => void;
}

export type NavigationHeaderProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler
  & InjectedIntlProps
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps;

const createProps: mapper<NavigationHeaderProps, IOwnState> = (props: NavigationHeaderProps) => ({ 
  nameInitial: props.userState.user && formatInitial(props.userState.user.fullName),
  isDialogAccessOpen: false,
  isDialogLogoutOpen: false
});

const stateUpdaters: StateUpdaters<NavigationHeaderProps, IOwnState, IOwnStateUpdaters> = {
  setDialogAccess: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isDialogAccessOpen: !prevState.isDialogAccessOpen
  }),
  setDialogLogout: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    isDialogLogoutOpen: !prevState.isDialogLogoutOpen
  })
};

const handlerCreator: HandleCreators<NavigationHeaderProps, IOwnHandler> = {
  handleOnClickAccess: (props: NavigationHeaderProps) => (event: React.MouseEvent) => {
    props.setDialogAccess();
  },
  handleOnClickAccessConfirmed: (props: NavigationHeaderProps) => (event: React.MouseEvent) => {
    props.history.push('/account/access');
  },
  handleOnClickLogout: (props: NavigationHeaderProps) => (event: React.MouseEvent) => {
    props.setDialogLogout();
  },
  handleOnClickLogoutConfirmed: (props: NavigationHeaderProps) => (event: React.MouseEvent) => {
    AppUserManager
      .signoutRedirect()
      .then(() => {
        store.clearAll();
      });
  }
};

export const NavigationHeader = compose<NavigationHeaderProps, IOwnOption>(
  setDisplayName('NavigationHeader'),
  injectIntl,
  withUser,
  withStyles(styles),
  withRouter,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
)(NavigationHeaderView);