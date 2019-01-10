import { IViewConfig } from '@layout/classes/config/IViewConfig';
import { IView } from '@layout/interfaces';
import { IAlert } from '@layout/interfaces/IAlert';
import { Anchor } from '@layout/types';
import { action } from 'typesafe-actions';

export const enum LayoutAction {
  THEME_CHANGE = '@@layout/THEME_CHANGE',

  ACCOUNT_EXPAND = '@@layout/ACCOUNT_EXPAND',
  ACCOUNT_COLAPSE = '@@layout/ACCOUNT_COLAPSE',
  
  ALERT_ADD = '@@layout/ALERT_ADD',
  ALERT_DISSMIS = '@@layout/ALERT_DISSMIS',
  
  CHANGE_ANCHOR = '@@layout/CHANGE_ANCHOR',
  CHANGE_NOTIF_COUNT = '@@layout/CHANGE_NOTIF_COUNT',
  CHANGE_VIEW = '@@layout/CHANGE_VIEW',

  SETUP_VIEW = '@@layout/SETUP_VIEW',

  NAV_BACK_SHOW = '@@layout/NAV_BACK_SHOW',
  NAV_BACK_HIDE = '@@layout/NAV_BACK_HIDE',
  MORE_SHOW = '@@layout/MORE_SHOW',
  MORE_HIDE = '@@layout/MORE_HIDE',
  SEARCH_SHOW = '@@layout/SEARCH_SHOW',
  SEARCH_HIDE = '@@layout/SEARCH_HIDE',
  ALERT_DIALOG_SHOW = '@@layout/ALERT_DIALOG_SHOW',
  ALERT_DIALOG_HIDE = '@@layout/ALERT_DIALOG_HIDE',

  MODE_SEARCH_ON = '@@layout/MODE_SEARCH_ON',
  MODE_SEARCH_OFF = '@@layout/MODE_SEARCH_OFF',
  MODE_LIST_ON = '@@layout/MODE_LIST_ON',
  MODE_LIST_OFF = '@@layout/MODE_LIST_OFF',
}

export const layoutThemeChange = () => action(LayoutAction.THEME_CHANGE);

export const layoutAccountExpand = () => action(LayoutAction.ACCOUNT_EXPAND);
export const layoutAccountColapse = () => action(LayoutAction.ACCOUNT_COLAPSE);

export const layoutAlertAdd = (alert: IAlert) => action(LayoutAction.ALERT_ADD, alert);
export const layoutAlertDismiss = () => action(LayoutAction.ALERT_DISSMIS);

export const layoutChangeAnchor = (anchor: Anchor) => action(LayoutAction.CHANGE_ANCHOR, anchor);
export const layoutChangeNotif = (count: number) => action(LayoutAction.CHANGE_NOTIF_COUNT, count);
export const layoutChangeView = (view: IView | null) => action(LayoutAction.CHANGE_VIEW, view);

export const layoutSetupView = (config: IViewConfig) => action(LayoutAction.SETUP_VIEW, config);

export const layoutNavBackShow = () => action(LayoutAction.NAV_BACK_SHOW);
export const layoutNavBackHide = () => action(LayoutAction.NAV_BACK_HIDE);
export const layoutMoreShow = () => action(LayoutAction.MORE_SHOW);
export const layoutMoreHide = () => action(LayoutAction.MORE_HIDE);
export const layoutSearchShow = () => action(LayoutAction.SEARCH_SHOW);
export const layoutSearchHide = () => action(LayoutAction.SEARCH_HIDE);
export const layoutAlertDialogShow = () => action(LayoutAction.ALERT_DIALOG_SHOW);
export const layoutAlertDialogHide = () => action(LayoutAction.ALERT_DIALOG_HIDE);

export const layoutModeSearchOn = () => action(LayoutAction.MODE_SEARCH_ON);
export const layoutModeSearchOff = () => action(LayoutAction.MODE_SEARCH_OFF);
export const layoutModeListOn = () => action(LayoutAction.MODE_LIST_ON);
export const layoutModeListOff = () => action(LayoutAction.MODE_LIST_OFF);