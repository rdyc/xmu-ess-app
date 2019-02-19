import { IAppState } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IAppBarControl, IAppBarMenu, IAppBarState } from '@layout/interfaces';
import {
  appBarAssignControls,
  appBarAssignCustomComponent,
  appBarAssignFields,
  appBarAssignMenuCallback,
  appBarAssignMenus,
  appBarAssignSearchCallback,
  appBarAssignSearchComponent,
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
    assignControls: typeof appBarAssignControls;
    assignMenus: typeof appBarAssignMenus;
    assignFields: typeof appBarAssignFields;
    selectionAddRemove: typeof appBarSelectionAddRemove;
    selectionClear: typeof appBarSelectionClear;
    dispose: typeof appBarDispose;
    assignSearchComponent: typeof appBarAssignSearchComponent;
    assignCustomComponent: typeof appBarAssignCustomComponent;
  };
}

export interface WithAppBar extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ appBar }: IAppState) => ({
  appBarState: appBar,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  appBarDispatch: {
    assignCallback: (callback: (menu: IAppBarMenu) => void) => dispatch(appBarAssignMenuCallback(callback)),
    assignSearchCallback: (callback: (find: string, findBy?: ICollectionValue) => void) => dispatch(appBarAssignSearchCallback(callback)),
    assignSelectionClearCallback: (callback: () => void) => dispatch(appBarAssignSelectionClearCallback(callback)),
    assignSelectionProcessCallback: (callback: () => void) => dispatch(appBarAssignSelectionProcessCallback(callback)),
    assignControls: (controls: IAppBarControl[]) => dispatch(appBarAssignControls(controls)),
    assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
    assignFields: (fields: ICollectionValue[]) => dispatch(appBarAssignFields(fields)),
    selectionAddRemove: (value: string) => dispatch(appBarSelectionAddRemove(value)),
    selectionClear: () => dispatch(appBarSelectionClear()),
    dispose: () => dispatch(appBarDispose()),
    assignSearchComponent: (component: React.ReactNode) => dispatch(appBarAssignSearchComponent(component)),
    assignCustomComponent: (component: React.ReactNode) => dispatch(appBarAssignCustomComponent(component)),
  }
});

export const withAppBar = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);