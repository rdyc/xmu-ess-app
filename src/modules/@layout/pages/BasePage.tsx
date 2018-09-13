import { withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../../../withRoot';
import styles from '../../../styles';
import * as store from 'store';
import { connect } from 'react-redux';
import { IAppState } from '../../../generic/interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
// tslint:disable-next-line:max-line-length
import { ConnectedReduxProps } from '../../../generic/types';
import { TopAppBar, MenuDrawer, AdditionalDrawer, BottomSnackbar } from '../components/common';
import { Dispatch } from 'redux';
import { ILookupRoleMenuList } from '../../lookup/interfaces/ILookupRoleMenuList';
import { ISnackbarAlert, ICurrentPage, IAppUser } from '../interfaces';
import { AppStorage } from '../../../constants';
import { Anchor } from '../types';
import { setAnchor, setMenuDrawer, setAdditionalDrawer, setAccountShow, setTopDrawer, setBottomDrawer, setActive, setMenuItems, setUser, setLogoutDialog, setAlertSnackbar } from '../store/actionCreators';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  topDrawer: boolean;
  bottomDrawer: boolean;
  menuItems: ILookupRoleMenuList[];
  active: ICurrentPage;
  user: IAppUser;
  notification: number;
  logoutDialog: boolean;
  alertSnackbar: ISnackbarAlert;
}

interface PropsFromDispatch {
  setAnchor: typeof setAnchor;
  setMenuDrawer: typeof setMenuDrawer;
  setAdditionalDrawer: typeof setAdditionalDrawer;
  setAccountShow: typeof setAccountShow;
  setTopDrawer: typeof setTopDrawer;
  setBottomDrawer: typeof setBottomDrawer;
  setActive: typeof setActive;
  setMenuItems: typeof setMenuItems;
  setUser: typeof setUser;
  setLogoutDialog: typeof setLogoutDialog;
  setAlertSnackbar: typeof setAlertSnackbar;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class BasePage extends React.Component<AllProps> {
  private loadStorage() {
    const user: IAppUser = store.get(AppStorage.User);
    const menu: ILookupRoleMenuList[] = store.get(AppStorage.Menu);

    if (user && menu) {
      this.props.setUser(user);
      this.props.setMenuItems(menu);
    }
  }

  public componentDidMount() {
    this.loadStorage();  
  }
  
  public render() {
    return (
      <div className={this.props.classes.root}>
        <TopAppBar {...this.props}/>
        <MenuDrawer {...this.props}/>
        <AdditionalDrawer {...this.props}/>
        <main className={this.props.classes.content}>
          {this.props.children}
        </main>
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
  topDrawer: layout.topDrawer,
  bottomDrawer: layout.bottomDrawer,
  menuItems: layout.menuItems,
  active: layout.active,
  user: layout.user,
  notification: layout.notification,
  logoutDialog: layout.logoutDialog,
  alertSnackbar: layout.alertSnackbar
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnchor: (anchor: Anchor) => dispatch(setAnchor(anchor)),
  setMenuDrawer: (open: boolean) => dispatch(setMenuDrawer(open)),
  setAdditionalDrawer: (open: boolean) => dispatch(setAdditionalDrawer(open)),
  setAccountShow: (open: boolean) => dispatch(setAccountShow(open)),
  setTopDrawer: (open: boolean) => dispatch(setTopDrawer(open)),
  setBottomDrawer: (open: boolean) => dispatch(setBottomDrawer(open)),
  setActive: (active: ICurrentPage) => dispatch(setActive(active)),
  setMenuItems: (items: ILookupRoleMenuList[]) => dispatch(setMenuItems(items)),
  setUser: (user: IAppUser) => dispatch(setUser(user)),
  setLogoutDialog: (open: boolean) => dispatch(setLogoutDialog(open)),
  setAlertSnackbar: (data: ISnackbarAlert) => dispatch(setAlertSnackbar(data)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(BasePage);

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));