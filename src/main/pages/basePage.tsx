import { withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import withRoot from '../withRoot';
import styles from '../styles';
import * as store from 'store';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { RouteComponentProps, withRouter } from 'react-router';
// tslint:disable-next-line:max-line-length
import { Anchor, setMenuDrawer, setActive, setAdditionalDrawer, setTopDrawer, setBottomDrawer, Active, AppUser, setUser, setMenuItems, setAccountShow, setAnchor } from '../store/@layout';
import { ConnectedReduxProps } from '../store';
import { TopAppBar, MenuDrawer, AdditionalDrawer } from '../components';
import { Dispatch } from 'redux';
import { LookupRoleMenuListType } from '../store/lookup/types/LookupRoleMenuListType';
import { AppConstant } from '../constants';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  anchor: Anchor;
  menuDrawer: boolean;
  additionalDrawer: boolean;
  accountShow: boolean;
  topDrawer: boolean;
  bottomDrawer: boolean;
  menuItems: LookupRoleMenuListType[];
  active: Active;
  user: AppUser;
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
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps;

class BasePage extends React.Component<AllProps> {
  private loadStorage() {
    const user: AppUser = store.get(AppConstant.STORAGE.USER);
    const menu: LookupRoleMenuListType[] = store.get(AppConstant.STORAGE.MENU);

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
      </div>
    );
  }
}

const mapStateToProps = ({ layout }: AppState) => ({
  anchor: layout.anchor,
  menuDrawer: layout.menuDrawer,
  additionalDrawer: layout.additionalDrawer,
  accountShow: layout.accountShow,
  topDrawer: layout.topDrawer,
  bottomDrawer: layout.bottomDrawer,
  menuItems: layout.menuItems,
  active: layout.active,
  user: layout.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnchor: (anchor: Anchor) => dispatch(setAnchor(anchor)),
  setMenuDrawer: (open: boolean) => dispatch(setMenuDrawer(open)),
  setAdditionalDrawer: (open: boolean) => dispatch(setAdditionalDrawer(open)),
  setAccountShow: (open: boolean) => dispatch(setAccountShow(open)),
  setTopDrawer: (open: boolean) => dispatch(setTopDrawer(open)),
  setBottomDrawer: (open: boolean) => dispatch(setBottomDrawer(open)),
  setActive: (active: Active) => dispatch(setActive(active)),
  setMenuItems: (items: LookupRoleMenuListType[]) => dispatch(setMenuItems(items)),
  setUser: (user: AppUser) => dispatch(setUser(user))
});

const redux = connect(mapStateToProps, mapDispatchToProps)(BasePage);

export default withRouter(withRoot(withStyles(styles)<{}>(redux)));