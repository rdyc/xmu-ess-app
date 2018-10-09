import { IAppState } from '@generic/interfaces';
import { SortDirection } from '@generic/types';
import { IListBarCallback, IListBarField, IListBarState } from '@layout/interfaces';
import {
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
import { compose, setDisplayName } from 'recompose';
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
  };
}

export type WithNavBottom 
  = PropsFromState 
  & PropsFromDispatch;

const withNavBottom = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithNavBottom(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const component: React.SFC<WithNavBottom> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ navBottom }: IAppState) => ({
    navBottomState: navBottom
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    navBottomDispatch: {
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
  
  return compose<WithNavBottom, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps, mapDispatchToProps)
  )(component);
};

export default withNavBottom;