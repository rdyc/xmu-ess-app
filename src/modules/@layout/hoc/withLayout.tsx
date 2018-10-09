import { IAppState } from '@generic/interfaces';
import { IAlert, ILayoutState, IView } from '@layout/interfaces';
import {
  layoutAccountColapse,
  layoutAccountExpand,
  layoutActionCentreHide,
  layoutActionCentreShow,
  layoutAlertAdd,
  layoutAlertDialogHide,
  layoutAlertDialogShow,
  layoutAlertDismiss,
  layoutChangeAnchor,
  layoutChangeNotif,
  layoutChangeView,
  layoutDrawerActionHide,
  layoutDrawerActionShow,
  layoutDrawerBottomHide,
  layoutDrawerBottomShow,
  layoutDrawerMenuHide,
  layoutDrawerMenuShow,
  layoutDrawerTopHide,
  layoutDrawerTopShow,
  layoutLogoutDialogHide,
  layoutLogoutDialogShow,
  layoutModeListOff,
  layoutModeListOn,
  layoutModeSearchOff,
  layoutModeSearchOn,
  layoutMoreHide,
  layoutMoreShow,
  layoutNavBackHide,
  layoutNavBackShow,
  layoutSearchHide,
  layoutSearchShow,
} from '@layout/store/actions';
import { Anchor } from '@layout/types';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { Dispatch } from 'redux';

interface PropsFromState {
  layoutState: ILayoutState;
}

interface PropsFromDispatch {
  layoutDispatch: {
    alertAdd: typeof layoutAlertAdd;
    alertDismiss: typeof layoutAlertDismiss;

    changeAnchor: typeof layoutChangeAnchor;
    changeNotif: typeof layoutChangeNotif;
    changeView: typeof layoutChangeView;

    drawerMenuShow: typeof layoutDrawerMenuShow;
    drawerMenuHide: typeof layoutDrawerMenuHide;
    drawerActionShow: typeof layoutDrawerActionShow;
    drawerActionHide: typeof layoutDrawerActionHide;
    drawerTopShow: typeof layoutDrawerTopShow;
    drawerTopHide: typeof layoutDrawerTopHide;
    drawerBottomShow: typeof layoutDrawerBottomShow;
    drawerBottomHide: typeof layoutDrawerBottomHide;
    
    alertDialogShow: typeof layoutAlertDialogShow;
    alertDialogHide: typeof layoutAlertDialogHide;
    logoutDialogShow: typeof layoutLogoutDialogShow;
    logoutDialogHide: typeof layoutLogoutDialogHide;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    searchShow: typeof layoutSearchShow;
    searchHide: typeof layoutSearchHide;
    actionCentreShow: typeof layoutActionCentreShow;
    actionCentreHide: typeof layoutActionCentreHide;
    moreShow: typeof layoutMoreShow;
    moreHide: typeof layoutMoreHide;
    
    accountExpand: typeof layoutAccountExpand;
    accountColapse: typeof layoutAccountColapse;
    
    modeSearchOn: typeof layoutModeSearchOn;
    modeSearchOff: typeof layoutModeSearchOff;
    modeListOn: typeof layoutModeListOn;
    modeListOff: typeof layoutModeListOff;
  };
}

export type WithLayout 
  = PropsFromState 
  & PropsFromDispatch;

const withLayout = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withLayoutComponent: React.SFC<WithLayout> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ layout }: IAppState) => ({
    layoutState: layout
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    layoutDispatch: {
      alertAdd: (alert: IAlert) => dispatch(layoutAlertAdd(alert)),
      alertDismiss: () => dispatch(layoutAlertDismiss()),
  
      changeAnchor: (anchor: Anchor) => dispatch(layoutChangeAnchor(anchor)),
      changeNotif: (count: number) => dispatch(layoutChangeNotif(count)),
      changeView: (active: IView) => dispatch(layoutChangeView(active)),
      
      drawerMenuShow: () => dispatch(layoutDrawerMenuShow()),
      drawerMenuHide: () => dispatch(layoutDrawerMenuHide()),
      drawerActionShow: () => dispatch(layoutDrawerActionShow()),
      drawerActionHide: () => dispatch(layoutDrawerActionHide()),
      drawerTopShow: () => dispatch(layoutDrawerTopShow()),
      drawerTopHide: () => dispatch(layoutDrawerTopHide()),
      drawerBottomShow: () => dispatch(layoutDrawerBottomShow()),
      drawerBottomHide: () => dispatch(layoutDrawerBottomHide()),
      
      accountExpand: () => dispatch(layoutAccountExpand()),
      accountColapse: () => dispatch(layoutAccountColapse()),
      
      alertDialogShow: () => dispatch(layoutAlertDialogShow()),
      alertDialogHide: () => dispatch(layoutAlertDialogHide()),
      logoutDialogShow: () => dispatch(layoutLogoutDialogShow()),
      logoutDialogHide: () => dispatch(layoutLogoutDialogHide()),
      navBackShow: () => dispatch(layoutNavBackShow()),
      navBackHide: () => dispatch(layoutNavBackHide()),
      searchShow: () => dispatch(layoutSearchShow()),
      searchHide: () => dispatch(layoutSearchHide()),
      actionCentreShow: () => dispatch(layoutActionCentreShow()),
      actionCentreHide: () => dispatch(layoutActionCentreHide()),
      moreShow: () => dispatch(layoutMoreShow()),
      moreHide: () => dispatch(layoutMoreHide()),
      
      modeSearchOn: () => dispatch(layoutModeSearchOn()),
      modeSearchOff: () => dispatch(layoutModeSearchOff()), 
      modeListOn: () => dispatch(layoutModeListOn()),
      modeListOff: () => dispatch(layoutModeListOff()),
    }
  });
  
  return compose<WithLayout, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps, mapDispatchToProps)
  )(withLayoutComponent);
};

export default withLayout;