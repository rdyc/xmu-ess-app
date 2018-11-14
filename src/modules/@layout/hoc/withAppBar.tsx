import { IAppState } from '@generic/interfaces';
import { IAppBarMenu, IAppBarState, IListBarField } from '@layout/interfaces';
import {
  appBarAssignFields,
  appBarAssignMenuCallback,
  appBarAssignMenus,
  appBarAssignSearchCallback,
  appBarDispose
} from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  appBarState: IAppBarState;
}

interface PropsFromDispatch {
  appBarDispatch: {
    assignCallback: typeof appBarAssignMenuCallback;
    assignSearchCallback: typeof appBarAssignSearchCallback;
    assignMenus: typeof appBarAssignMenus;
    assignFields: typeof appBarAssignFields;
    dispose: typeof appBarDispose;
  };
}

export interface WithAppBar extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ appBar }: IAppState) => ({
  appBarState: appBar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  appBarDispatch: {
    assignCallback: (callback: (menu: IAppBarMenu) => void) => dispatch(appBarAssignMenuCallback(callback)),
    assignSearchCallback: (callback: (find: string, findBy?: IListBarField | undefined) => void) => dispatch(appBarAssignSearchCallback(callback)),
    assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
    assignFields: (fields: IListBarField[]) => dispatch(appBarAssignFields(fields)),
    dispose: () => dispatch(appBarDispose()),
  }
});

export const withAppBar = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);