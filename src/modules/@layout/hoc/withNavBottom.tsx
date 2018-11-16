import { IAppState } from '@generic/interfaces';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { IListBarCallback, IListBarState } from '@layout/interfaces';
import {
  listBarAddHide,
  listBarAssignCallbacks,
  listBarAssignFields,
  listBarChangeDirection,
  listBarChangeOrder,
  listBarChangeSize,
  listBarDispose,
  listBarMenuHide,
  listBarMenuShow,
} from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void> {
  navBottomState: IListBarState;
}

interface PropsFromDispatch {
  navBottomDispatch: {
    assignCallbacks: typeof listBarAssignCallbacks;
    assignFields: typeof listBarAssignFields;
    changeOrder: typeof listBarChangeOrder;
    changeDirection: typeof listBarChangeDirection;
    changeSize: typeof listBarChangeSize;
    dispose: typeof listBarDispose;
    menuShow: typeof listBarMenuShow;
    menuHide: typeof listBarMenuHide;
    addHide: typeof listBarAddHide;
  };
}

export interface WithNavBottom extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ navBottom }: IAppState) => ({
  navBottomState: navBottom
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navBottomDispatch: {
    assignCallbacks: (callbacks: IListBarCallback) => dispatch(listBarAssignCallbacks(callbacks)),
    assignFields: (fields: ICollectionValue[]) => dispatch(listBarAssignFields(fields)),
    changeOrder: (name: string) => dispatch(listBarChangeOrder(name)),
    changeSize: (size: number) => dispatch(listBarChangeSize(size)),
    changeDirection: (direction: SortDirection) => dispatch(listBarChangeDirection(direction)),
    dispose: () => dispatch(listBarDispose()),
    menuShow: (anchorId: any) => dispatch(listBarMenuShow(anchorId)),
    menuHide: () => dispatch(listBarMenuHide()),
    addHide: () => dispatch(listBarAddHide()),
  }
});

export const withNavBottom = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);