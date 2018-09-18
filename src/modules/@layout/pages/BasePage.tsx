import { AppStorage } from '@constants/index';
import { IAppState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { AdditionalDrawer, BottomSnackbar, MenuDrawer, TopAppBar, BottomBar } from '@layout/components/common';
import { IAppUser, ICurrentPage, ISnackbarAlert } from '@layout/interfaces';
import {
  setAccountShow,
  setAdditionalDrawer,
  setAlertSnackbar,
  setAnchor,
  setBottomDrawer,
  setCurrentPage,
  setLogoutDialog,
  setMenuDrawer,
  setMenuItems,
  setSearchMode,
  setTopDrawer,
  setUser,
  setNavBack,
  setListMode,
} from '@layout/store/actionCreators';
import { Anchor } from '@layout/types';
import { ILookupRoleMenuList } from '@lookup/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import * as store from 'store';

import withRoot from '../../../withRoot';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  searchMode: boolean;
  listMode: boolean;
  topDrawer: boolean;
  bottomDrawer: boolean;
  menuItems: ILookupRoleMenuList[];
  active: ICurrentPage;
  user: IAppUser;
  notification: number;
  logoutDialog: boolean;
  alertSnackbar: ISnackbarAlert;
  navBack: boolean;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setMenuDrawer: typeof setMenuDrawer;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setAccountShow: typeof setAccountShow;
  setSearchMode: typeof setSearchMode;
  setListMode: typeof setListMode;
  setTopDrawer: typeof setTopDrawer;
  setBottomDrawer: typeof setBottomDrawer;
  setActive: typeof setCurrentPage;
  setMenuItems: typeof setMenuItems;
  setUser: typeof setUser;
  setLogoutDialog: typeof setLogoutDialog;
  setAlertSnackbar: typeof setAlertSnackbar;
  setNavBack: typeof setNavBack;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & WithWidthProps;

class BasePage extends React.Component<AllProps> {
  private loadStorage() {
    const user: IAppUser = store.get(AppStorage.User);
    const menu: ILookupRoleMenuList[] = store.get(AppStorage.Menu);

    if (user && menu) {
      this.props.setUser(user);
      this.props.setMenuItems(menu);
    }
  }

  public componentWillMount() {
    this.loadStorage();  
  }
  
  public render() {
    const { anchor, listMode, classes } = this.props;

    return (
      <div className={classes.root}>
        <TopAppBar {...this.props}/>
        <MenuDrawer {...this.props}/>
        <AdditionalDrawer {...this.props}/>
        <main className={classNames(
          classes.content,
          listMode ? classes.contentWithBottomNav : '',
          anchor === 'right' ? classes.contentShiftRight : classes.contentShiftLeft)}
        >
          {this.props.children}
        </main>
        <BottomBar {...this.props}/>
        <BottomSnackbar {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }: IAppState) => ({
  anchor: layout.anchor,
  menuDrawer: layout.menuDrawer,
  additionalDrawer: layout.additionalDrawer,
  accountShow: layout.accountShow,
  searchMode: layout.searchMode,
  listMode: layout.listMode,
  topDrawer: layout.topDrawer,
  bottomDrawer: layout.bottomDrawer,
  menuItems: layout.menuItems,
  active: layout.active,
  user: layout.user,
  notification: layout.notification,
  logoutDialog: layout.logoutDialog,
  alertSnackbar: layout.alertSnackbar,
  navBack: layout.navBack,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnchor: (anchor: Anchor) => dispatch(setAnchor(anchor)),
  setMenuDrawer: (open: boolean) => dispatch(setMenuDrawer(open)),
  setAdditionalDrawer: (open: boolean) => dispatch(setAdditionalDrawer(open)),
  setAccountShow: (open: boolean) => dispatch(setAccountShow(open)),
  setSearchMode: (activated: boolean) => dispatch(setSearchMode(activated)),
  setListMode: (acivated: boolean) => dispatch(setListMode(acivated)),
  setTopDrawer: (open: boolean) => dispatch(setTopDrawer(open)),
  setBottomDrawer: (open: boolean) => dispatch(setBottomDrawer(open)),
  setActive: (active: ICurrentPage) => dispatch(setCurrentPage(active)),
  setMenuItems: (items: ILookupRoleMenuList[]) => dispatch(setMenuItems(items)),
  setUser: (user: IAppUser) => dispatch(setUser(user)),
  setLogoutDialog: (open: boolean) => dispatch(setLogoutDialog(open)),
  setAlertSnackbar: (data: ISnackbarAlert) => dispatch(setAlertSnackbar(data)),
  setNavBack: (enabled: boolean) => dispatch(setNavBack(enabled)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(withWidth()(BasePage));

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));