import { initialName } from '@layout/helper/initialName';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { Anchor } from '@layout/types';
import { PaletteType, WithStyles, withStyles } from '@material-ui/core';
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

import { NavigationHeaderView } from './NavigationHeaderView';

interface IOwnOption {
  defaultAnchor: Anchor;
  headerUid?: string;
  onClickHeader: (headerUid: string) => void;
}

interface IOwnState {
  nameInitial?: string;
  anchor: Anchor;
  paletteType: PaletteType;
  isDialogAccessOpen: boolean;
  isDialogLogoutOpen: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setAnchor: StateHandler<IOwnState>;
  setPaletteType: StateHandler<IOwnState>;
  setDialogAccess: StateHandler<IOwnState>;
  setDialogLogout: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnClickTheme: () => void;
  handleOnClickAnchor: () => void;
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
  // & WithLayout
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
  setDialogAccess: (state: IOwnState) => (): Partial<IOwnState> => ({
    isDialogAccessOpen: !state.isDialogAccessOpen
  }),
  setDialogLogout: (state: IOwnState) => (): Partial<IOwnState> => ({
    isDialogLogoutOpen: !state.isDialogLogoutOpen
  })
};

const handlerCreator: HandleCreators<NavigationHeaderProps, IOwnHandler> = {
  handleOnClickTheme: (props: NavigationHeaderProps) => () => {
    props.setPaletteType();
    // props.layoutDispatch.themeChange();

    // if (props.userState.user) {
    //   store.set(`${AppStorage.Personalization}:${props.userState.user.uid}`, { 
    //     theme: props.layoutState.theme,
    //     anchor: props.layoutState.anchor
    //   });
    // }
  },
  handleOnClickAnchor: (props: NavigationHeaderProps) => () => {
    props.masterPage.changeAnchor();

    props.setAnchor();

    // props.layoutDispatch.changeAnchor(props.layoutState.anchor === 'right' ? 'left' : 'right');

    // if (props.userState.user) {
    //   store.set(`${AppStorage.Personalization}:${props.userState.user.uid}`, { 
    //     theme: props.layoutState.theme,
    //     anchor: props.layoutState.anchor
    //   });
    // }
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
    // AppUserManager
    //   .signoutRedirect()
    //   .then(() => {
    //     store.remove(AppStorage.Profile);
    //     store.remove(AppStorage.Access);
    //   });

    AppUserManager
      .signoutRedirect()
      .catch(error => { 
        console.error('error while logging in through the popup', error);
      });
  }
};

// const lifecycles: ReactLifeCycleFunctions<NavigationHeaderProps, IOwnOption> = {
//   componentDidMount() {
//     if (this.props.userState.user) {
//       // read previous saved personalization
//       const personalization = store.get(`${AppStorage.Personalization}:${this.props.userState.user.uid}`);

//       if (personalization) {
//         // set previous anchor
//         this.props.layoutDispatch.changeAnchor(personalization.theme.anchor);
        
//         // check dark type
//         if (personalization.theme.palette.type === 'dark') {
//           this.props.layoutDispatch.themeChange();
//         }
//       }
//     }
//   }
// };

export const NavigationHeader = compose<NavigationHeaderProps, IOwnOption>(
  setDisplayName('NavigationHeader'),
  injectIntl,
  withUser,
  withStyles(styles),
  // withLayout,
  withMasterPage,
  withRouter,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreator),
  // lifecycle(lifecycles)
)(NavigationHeaderView);