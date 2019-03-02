import { IAppState } from '@generic/interfaces';
import { IViewConfig } from '@layout/classes/config/IViewConfig';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import {
  layoutAlertAdd,
  layoutAlertDialogHide,
  layoutAlertDialogShow,
  layoutAlertDismiss,
  layoutChangeView,
  layoutModeListOff,
  layoutModeSearchOff,
  layoutMoreHide,
  layoutMoreShow,
  layoutNavBackHide,
  layoutNavBackShow,
  layoutSearchHide,
  layoutSetupView,
} from '@layout/store/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    alertAdd: typeof layoutAlertAdd;
    alertDismiss: typeof layoutAlertDismiss;
    changeView: typeof layoutChangeView;
    setupView: typeof layoutSetupView;
    alertDialogShow: typeof layoutAlertDialogShow;
    alertDialogHide: typeof layoutAlertDialogHide;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    searchHide: typeof layoutSearchHide;
    moreShow: typeof layoutMoreShow;
    moreHide: typeof layoutMoreHide;
    modeSearchOff: typeof layoutModeSearchOff;
    modeListOff: typeof layoutModeListOff;
  };
}

export interface WithLayout extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ layout }: IAppState) => ({
  layoutState: layout
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
    alertDismiss: () => dispatch(layoutAlertDismiss()),
    changeView: (active: IView) => dispatch(layoutChangeView(active)),
    setupView: (config: IViewConfig) => dispatch(layoutSetupView(config)),
    alertDialogShow: () => dispatch(layoutAlertDialogShow()),
    alertDialogHide: () => dispatch(layoutAlertDialogHide()),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
    searchHide: () => dispatch(layoutSearchHide()),
    moreShow: () => dispatch(layoutMoreShow()),
    moreHide: () => dispatch(layoutMoreHide()),
    modeSearchOff: () => dispatch(layoutModeSearchOff()), 
    modeListOff: () => dispatch(layoutModeListOff()),
  }
});

export const withLayout = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);