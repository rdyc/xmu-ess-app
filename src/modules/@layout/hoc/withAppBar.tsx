import { IAppState } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IAppBarControl, IAppBarMenu, IAppBarState } from '@layout/interfaces';
import { appBarAssignControls, appBarAssignMenus, appBarAssignSearchCallback, appBarDispose } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  appBarState: IAppBarState;
}

interface PropsFromDispatch {
  appBarDispatch: {
    assignSearchCallback: typeof appBarAssignSearchCallback;
    assignControls: typeof appBarAssignControls;
    assignMenus: typeof appBarAssignMenus;
    dispose: typeof appBarDispose;
  };
}

export interface WithAppBar extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ appBar }: IAppState) => ({
  appBarState: appBar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  appBarDispatch: {
    assignSearchCallback: (callback: (find: string, findBy?: ICollectionValue) => void) => dispatch(appBarAssignSearchCallback(callback)),
    assignControls: (controls: IAppBarControl[]) => dispatch(appBarAssignControls(controls)),
    assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
    dispose: () => dispatch(appBarDispose()),
  }
});

export const withAppBar = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);