import { IAppState } from '@generic/interfaces';
import { IPage, IPageState } from '@layout/classes/states';
import { pageChange } from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  view: IPageState;
}

interface PropsFromDispatch {
  pageChange: typeof pageChange;
}

export interface WithPage extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ view }: IAppState) => ({
  view
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pageChange: (page: IPage) => dispatch(pageChange(page))
});

export const withPage = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);