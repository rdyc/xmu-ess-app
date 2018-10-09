import { IAppState } from '@generic/interfaces';
import { IAppBarMenu, IAppBarState } from '@layout/interfaces';
import {
  appBarAssignCallback,
  appBarAssignMenus,
  appBarDispose,
  appBarMenuHide,
  appBarMenuShow,
} from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  appBarState: IAppBarState;
}

interface PropsFromDispatch {
  appBarDispatch: {
    assignCallback: typeof appBarAssignCallback;
    assignMenus: typeof appBarAssignMenus;
    menuShow: typeof appBarMenuShow;
    menuHide: typeof appBarMenuHide;
    dispose: typeof appBarDispose;
  };
}

export type WithAppBar 
  = PropsFromState 
  & PropsFromDispatch;

const withAppbar = (Component: React.ComponentType) => { 

  class WithAppBarComponent extends React.Component<WithAppBar> {
    public static displayName = `WithAppBar(${Component.name})`;

    public render() {
      return (
        <Component {...this.props}/>
      );
    }
  }

  const mapStateToProps = ({ appBar }: IAppState) => ({
    appBarState: appBar,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    appBarDispatch: {
      assignCallback: (callback: (menu: IAppBarMenu) => void) => dispatch(appBarAssignCallback(callback)),
      assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
      menuShow: () => dispatch(appBarMenuShow()),
      menuHide: () => dispatch(appBarMenuHide()),
      dispose: () => dispatch(appBarDispose()),
    }
  });
  
  return connect(
    mapStateToProps, 
    mapDispatchToProps
  )(WithAppBarComponent);   
};

export default withAppbar;