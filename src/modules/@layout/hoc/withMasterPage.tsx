import AppEvent from '@constants/AppEvent';
import { IPageInfo, IRedirection } from '@generic/interfaces';
import { pageHelper } from '@layout/helper/pageHelper';
import { IFlashMessage } from '@layout/interfaces';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import * as React from 'react';
import { connect } from 'react-redux';

const changeTheme = () => dispatchEvent(new CustomEvent(AppEvent.onChangeTheme));
const changeRoute = (detail: IRedirection) => dispatchEvent(new CustomEvent(AppEvent.onChangeRoute, { detail }));
const changeRouteFrom = (module: ModuleDefinitionType, type: NotificationType, uid?: string) => {
  const page = pageHelper.redirectFrom(module, type, uid);
  
  changeRoute(page);
};
const changeAnchor = () => dispatchEvent(new CustomEvent(AppEvent.onChangeAnchor));
const changePage = (detail: IPageInfo) => dispatchEvent(new CustomEvent(AppEvent.onChangePage, { detail }));
const resetPage = () => dispatchEvent(new CustomEvent(AppEvent.onResetPage));
const changeNotif = (detail: number) => dispatchEvent(new CustomEvent(AppEvent.onChangeNotif, { detail }));
const changeDrawerLeft = () => dispatchEvent(new CustomEvent(AppEvent.onChangeDrawerLeft));
const changeDrawerRight = () => dispatchEvent(new CustomEvent(AppEvent.onChangeDrawerRight));
const changeSearchComponent = (detail: React.ReactNode) => dispatchEvent(new CustomEvent(AppEvent.onChangeSearchComponent, { detail }));
const changeCustomComponent = (detail: React.ReactNode) => dispatchEvent(new CustomEvent(AppEvent.onChangeCustomComponent, { detail }));
const flashMessage = (detail: IFlashMessage) => dispatchEvent(new CustomEvent(AppEvent.onFlashMessage, { detail }));

const mapDispatchToProps = () => ({
  masterPage: {
    changeTheme,
    changeRoute,
    changeRouteFrom,
    changeAnchor,
    changePage,
    resetPage,
    changeNotif,
    changeDrawerLeft,
    changeDrawerRight,
    changeSearchComponent,
    changeCustomComponent,
    flashMessage
  }
});

interface PropsFromDispatch {
  masterPage: {
    changeTheme: typeof changeTheme;
    changeRoute: typeof changeRoute;
    changeRouteFrom: typeof changeRouteFrom;
    changeAnchor: typeof changeAnchor;
    changePage: typeof changePage;
    resetPage: typeof resetPage;
    changeNotif: typeof changeNotif;
    changeDrawerLeft: typeof changeDrawerLeft;
    changeDrawerRight: typeof changeDrawerRight;
    changeSearchComponent: typeof changeSearchComponent;
    changeCustomComponent: typeof changeCustomComponent;
    flashMessage: typeof flashMessage;
  };
}

export interface WithMasterPage extends PropsFromDispatch {}

export const withMasterPage = (component: React.ComponentType) => 
  connect(undefined, mapDispatchToProps)(component);