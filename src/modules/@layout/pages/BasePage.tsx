import { AppStorage } from '@constants/index';
import { IAppState, IBaseMetadata } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { AdditionalDrawer, BottomSnackbar, MenuDrawer, TopAppBar, BottomBar } from '@layout/components/common';
import { IAppUser, ICurrentPage, ISnackbarAlert, IListBarCallback } from '@layout/interfaces';
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
  searchModeOn,
  setTopDrawer,
  setUser,
  setNavBack,
  listModeOn,
  setListBarCallbacks,
  listModeOff,
  searchModeOff,
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

  listBarMetadata: IBaseMetadata;
  listBarReloading: boolean;
  listBarPage: number;
  listBarSize: number;
  listBarCallbacks: IListBarCallback;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setMenuDrawer: typeof setMenuDrawer;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setAccountShow: typeof setAccountShow;
  
  searchModeOn: typeof searchModeOn;
  searchModeOff: typeof searchModeOff;
  
  listModeOn: typeof listModeOn;
  listModeOff: typeof listModeOff;

  setTopDrawer: typeof setTopDrawer;
  setBottomDrawer: typeof setBottomDrawer;
  setActive: typeof setCurrentPage;
  setMenuItems: typeof setMenuItems;
  setUser: typeof setUser;
  setLogoutDialog: typeof setLogoutDialog;
  setAlertSnackbar: typeof setAlertSnackbar;
  setNavBack: typeof setNavBack;

  setListBarCallbacks: typeof setListBarCallbacks;
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

const mapStateToProps = ({ layout, listBar }: IAppState) => ({
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

  listBarMetadata: listBar.metadata,
  listBarReloading: listBar.isReload,
  listBarPage: listBar.page,
  listBarSize: listBar.size,
  listBarCallbacks: listBar.callbacks,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnchor: (anchor: Anchor) => dispatch(setAnchor(anchor)),
  setMenuDrawer: (open: boolean) => dispatch(setMenuDrawer(open)),
  setAdditionalDrawer: (open: boolean) => dispatch(setAdditionalDrawer(open)),
  setAccountShow: (open: boolean) => dispatch(setAccountShow(open)),
  
  searchModeOn: () => dispatch(searchModeOn()),
  searchModeOff: () => dispatch(searchModeOff()),
  
  listModeOn: () => dispatch(listModeOn()),
  listModeOff: () => dispatch(listModeOff()),
  
  setTopDrawer: (open: boolean) => dispatch(setTopDrawer(open)),
  setBottomDrawer: (open: boolean) => dispatch(setBottomDrawer(open)),
  setActive: (active: ICurrentPage) => dispatch(setCurrentPage(active)),
  setMenuItems: (items: ILookupRoleMenuList[]) => dispatch(setMenuItems(items)),
  setUser: (user: IAppUser) => dispatch(setUser(user)),
  setLogoutDialog: (open: boolean) => dispatch(setLogoutDialog(open)),
  setAlertSnackbar: (data: ISnackbarAlert) => dispatch(setAlertSnackbar(data)),
  setNavBack: (enabled: boolean) => dispatch(setNavBack(enabled)),

  setListBarCallbacks: (callbacks: IListBarCallback) => dispatch(setListBarCallbacks(callbacks)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(withWidth()(BasePage));

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));