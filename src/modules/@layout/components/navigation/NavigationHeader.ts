import { initialName } from '@layout/helper/initialName';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { Anchor } from '@layout/types';
import { PaletteType, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { AppUserManager } from '@utils/userManager';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IPopupMenuOption } from '../PopupMenu';
import { NavigationHeaderView } from './NavigationHeaderView';

interface IOwnOption {
  defaultAnchor: Anchor;
  headerUid?: string;
  onClickHeader: (headerUid: string) => void;
}

interface IOwnState {
  nameInitial?: string;
  anchor: Anchor;
  menuOptions?: IPopupMenuOption[];
  paletteType: PaletteType;
  isDialogAccessOpen: boolean;
  isDialogLogoutOpen: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setAnchor: StateHandler<IOwnState>;
  setPaletteType: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setDialogAccess: StateHandler<IOwnState>;
  setDialogLogout: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnSelectedMenu: (option: IPopupMenuOption) => void;
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
  & WithMasterPage
  & RouteComponentProps;

const createProps: mapper<NavigationHeaderProps, IOwnState> = (props: NavigationHeaderProps) => ({
  anchor: props.defaultAnchor,
  paletteType: 'light',
  nameInitial: props.userState.user && initialName(props.userState.user.fullName),
  isDialogAccessOpen: false,
  isDialogLogoutOpen: false
});

const stateUpdaters: StateUpdaters<NavigationHeaderProps, IOwnState, IOwnStateUpdaters> = {
  setAnchor: (state: IOwnState) => (): Partial<IOwnState> => ({
    anchor: state.anchor === 'left' ? 'right' : 'left'
  }),
  setPaletteType: (state: IOwnState) => (): Partial<IOwnState> => ({
    paletteType: state.paletteType === 'light' ? 'dark' : 'light'
  }),
  setOptions: (state: IOwnState) => (options: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setDialogAccess: (state: IOwnState) => (): Partial<IOwnState> => ({
    isDialogAccessOpen: !state.isDialogAccessOpen
  }),
  setDialogLogout: (state: IOwnState) => (): Partial<IOwnState> => ({
    isDialogLogoutOpen: !state.isDialogLogoutOpen
  })
};

const handlerCreator: HandleCreators<NavigationHeaderProps, IOwnHandler> = {
  handleOnSelectedMenu: (props: NavigationHeaderProps) => (option: IPopupMenuOption) => {
    switch (option.id) {
      case 'theme':
        props.setPaletteType();
        props.masterPage.changeTheme();
        break;
      case 'anchor':
        props.setAnchor();
        props.masterPage.changeAnchor();
        break;
      case 'switch':
        props.setDialogAccess();
        break;
      case 'logout':
        props.setDialogLogout();
        break;
    
      default:
        break;
    }
  },
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
      .catch(error => { 
        console.error('error while logging in through the popup', error);
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<NavigationHeaderProps, {}> = {
  componentDidMount() {
    const options = [
      {
        id: 'theme',
        name: this.props.intl.formatMessage(this.props.paletteType === 'light' ? layoutMessage.label.themeDark : layoutMessage.label.themeLight),
        enabled: true,
        visible: true
      },
      {
        id: 'anchor',
        name: this.props.intl.formatMessage(this.props.anchor === 'left' ? layoutMessage.label.anchorRight : layoutMessage.label.anchorLeft),
        enabled: true,
        visible: true
      },
      {
        id: 'switch',
        name: this.props.intl.formatMessage(layoutMessage.label.switch),
        enabled: true,
        visible: this.props.userState.user && this.props.userState.user.access.length > 1 || false
      },
      {
        id: 'logout',
        name: this.props.intl.formatMessage(layoutMessage.label.logout),
        enabled: true,
        visible: true
      }
    ];

    this.props.setOptions(options);
  }
};

export const NavigationHeader = compose<NavigationHeaderProps, IOwnOption>(
  setDisplayName('NavigationHeader'),
  withRouter,
  withUser,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
  lifecycle(lifecycles),
  withStyles(styles)
)(NavigationHeaderView);