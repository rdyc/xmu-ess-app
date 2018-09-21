import { AppStorage } from '@constants/index';
import { IAppState } from '@generic/interfaces';
import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { ActionDrawer, BottomSnackbar, ListBar, MenuDrawer, TopAppBar } from '@layout/components/common';
import { IAlert, IAppUser, ILayoutState, IListBarCallback, IListBarField, IListBarState, IView } from '@layout/interfaces';
import {
  layoutAccountColapse,
  layoutAccountExpand,
  layoutAssignMenus,
  layoutAssignUser,
  layoutChangeAlert,
  layoutChangeAnchor,
  layoutChangeNotif,
  layoutChangeView,
  layoutDrawerActionHide,
  layoutDrawerActionShow,
  layoutDrawerBottomHide,
  layoutDrawerBottomShow,
  layoutDrawerMenuHide,
  layoutDrawerMenuShow,
  layoutDrawerTopHide,
  layoutDrawerTopShow,
  layoutLogoutDialogHide,
  layoutLogoutDialogShow,
  layoutModeListOff,
  layoutModeListOn,
  layoutModeSearchOff,
  layoutModeSearchOn,
  layoutNavBackHide,
  layoutNavBackShow,
  listBarAssignCallbacks,
  listBarAssignFields,
  listBarChangeDirection,
  listBarChangeOrder,
  listBarChangeSize,
  listBarDispose,
  listBarMenuHide,
  listBarMenuShow,
} from '@layout/store/actions';
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
  layoutState: ILayoutState;
  listBarState: IListBarState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    assignUser: typeof layoutAssignUser;
    assignMenus: typeof layoutAssignMenus;
    
    changeAnchor: typeof layoutChangeAnchor;
    changeAlert: typeof layoutChangeAlert;
    changeNotif: typeof layoutChangeNotif;
    changeView: typeof layoutChangeView;

    drawerMenuShow: typeof layoutDrawerMenuShow;
    drawerMenuHide: typeof layoutDrawerMenuHide;
    drawerActionShow: typeof layoutDrawerActionShow;
    drawerActionHide: typeof layoutDrawerActionHide;
    drawerTopShow: typeof layoutDrawerTopShow;
    drawerTopHide: typeof layoutDrawerTopHide;
    drawerBottomShow: typeof layoutDrawerBottomShow;
    drawerBottomHide: typeof layoutDrawerBottomHide;
    
    logoutDialogShow: typeof layoutLogoutDialogShow;
    logoutDialogHide: typeof layoutLogoutDialogHide;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    
    accountExpand: typeof layoutAccountExpand;
    accountColapse: typeof layoutAccountColapse;
    
    modeSearchOn: typeof layoutModeSearchOn;
    modeSearchOff: typeof layoutModeSearchOff;
    modeListOn: typeof layoutModeListOn;
    modeListOff: typeof layoutModeListOff;
  
  };

  listBarDispatch: {
    assignCallbacks: typeof listBarAssignCallbacks;
    assignFields: typeof listBarAssignFields;
    changeOrder: typeof listBarChangeOrder;
    changeDirection: typeof listBarChangeDirection;
    changeSize: typeof listBarChangeSize;
    dispose: typeof listBarDispose;
    menuShow: typeof listBarMenuShow;
    menuHide: typeof listBarMenuHide;
  };
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & WithWidthProps;

class BasePage extends React.Component<AllProps> {
  private loadStorage() {
    const user: IAppUser = store.get(AppStorage.User);
    const menu: ILookupRoleMenuList[] = store.get(AppStorage.Menu);

    if (user && menu) {
      this.props.layoutDispatch.assignUser(user);
      this.props.layoutDispatch.assignMenus(menu);
    }
  }

  public componentWillMount() {
    this.loadStorage();  
  }
  
  public render() {
    const { classes } = this.props;
    const { anchor, isModeList } = this.props.layoutState;

    return (
      <div className={classes.root}>
        <TopAppBar {...this.props}/>
        <MenuDrawer {...this.props}/>
        <ActionDrawer {...this.props}/>
        <main className={classNames(
          classes.content,
          isModeList ? classes.contentWithBottomNav : '',
          anchor === 'right' ? classes.contentShiftRight : classes.contentShiftLeft)}
        >
          {this.props.children}
        </main>
        <ListBar {...this.props} />
        <BottomSnackbar {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, listBar }: IAppState) => ({
  layoutState: layout,
  listBarState: listBar
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    assignUser: (user: IAppUser) => dispatch(layoutAssignUser(user)),
    assignMenus: (items: ILookupRoleMenuList[]) => dispatch(layoutAssignMenus(items)),

    changeAnchor: (anchor: Anchor) => dispatch(layoutChangeAnchor(anchor)),
    changeAlert: (data: IAlert) => dispatch(layoutChangeAlert(data)),
    changeNotif: (count: number) => dispatch(layoutChangeNotif(count)),
    changeView: (active: IView) => dispatch(layoutChangeView(active)),
    
    drawerMenuShow: () => dispatch(layoutDrawerMenuShow()),
    drawerMenuHide: () => dispatch(layoutDrawerMenuHide()),
    drawerActionShow: () => dispatch(layoutDrawerActionShow()),
    drawerActionHide: () => dispatch(layoutDrawerActionHide()),
    drawerTopShow: () => dispatch(layoutDrawerTopShow()),
    drawerTopHide: () => dispatch(layoutDrawerTopHide()),
    drawerBottomShow: () => dispatch(layoutDrawerBottomShow()),
    drawerBottomHide: () => dispatch(layoutDrawerBottomHide()),
    
    accountExpand: () => dispatch(layoutAccountExpand()),
    accountColapse: () => dispatch(layoutAccountColapse()),
    
    logoutDialogShow: () => dispatch(layoutLogoutDialogShow()),
    logoutDialogHide: () => dispatch(layoutLogoutDialogHide()),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    
    modeSearchOn: () => dispatch(layoutModeSearchOn()),
    modeSearchOff: () => dispatch(layoutModeSearchOff()), 
    modeListOn: () => dispatch(layoutModeListOn()),
    modeListOff: () => dispatch(layoutModeListOff()),
  },

  listBarDispatch: {
    assignCallbacks: (callbacks: IListBarCallback) => dispatch(listBarAssignCallbacks(callbacks)),
    assignFields: (fields: IListBarField[]) => dispatch(listBarAssignFields(fields)),
    changeOrder: (name: string) => dispatch(listBarChangeOrder(name)),
    changeSize: (size: number) => dispatch(listBarChangeSize(size)),
    changeDirection: (direction: SortDirection) => dispatch(listBarChangeDirection(direction)),
    dispose: () => dispatch(listBarDispose()),
    menuShow: (anchorId: any) => dispatch(listBarMenuShow(anchorId)),
    menuHide: () => dispatch(listBarMenuHide()),
  }
});

const redux = connect(mapStateToProps, mapDispatchToProps)(withWidth()(BasePage));

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));