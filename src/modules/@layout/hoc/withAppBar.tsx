import { IAppState } from '@generic/interfaces';
import { IAppBarMenu, IAppBarState, IListBarField } from '@layout/interfaces';
import {
  appBarAssignFields,
  appBarAssignMenuCallback,
  appBarAssignMenus,
  appBarAssignSearchCallback,
  appBarAssignSelectionClearCallback,
  appBarAssignSelectionProcessCallback,
  appBarDispose,
  appBarSelectionAddRemove,
  appBarSelectionClear,
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
    assignSelectionClearCallback: typeof appBarAssignSelectionClearCallback;
    assignSelectionProcessCallback: typeof appBarAssignSelectionProcessCallback;
    assignMenus: typeof appBarAssignMenus;
    assignFields: typeof appBarAssignFields;
    selectionAddRemove: typeof appBarSelectionAddRemove;
    selectionClear: typeof appBarSelectionClear;
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
    assignSelectionClearCallback: (callback: () => void) => dispatch(appBarAssignSelectionClearCallback(callback)),
    assignSelectionProcessCallback: (callback: (values: string[]) => void) => dispatch(appBarAssignSelectionProcessCallback(callback)),
    assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
    assignFields: (fields: IListBarField[]) => dispatch(appBarAssignFields(fields)),
    selectionAddRemove: (value: string) => dispatch(appBarSelectionAddRemove(value)),
    selectionClear: () => dispatch(appBarSelectionClear()),
    dispose: () => dispatch(appBarDispose()),
  }
});

export const withAppBar = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);