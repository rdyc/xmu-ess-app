import { Reducer } from 'redux';
import { ILayoutState } from '@layout/interfaces';
import { LayoutAction } from '@layout/store/actions';

const initialState: ILayoutState = {
  user: undefined,
  anchor: 'left',
  menus: [],
  view: undefined,
  notifCount: 0,
  alert: undefined,
  isDrawerMenuVisible: false,
  isDrawerActionVisible: false,
  isAccountExpanded: false,
  isModeSearch: false,
  isModeList: false,
  isDrawerTopVisible: false,
  isDrawerBottomVisible: false,
  isLogoutDialogVisible: false,
  isNavBackVisible: false,
};

const reducer: Reducer<ILayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutAction.ASSIGN_USER: return { ...state, user: action.payload };
    case LayoutAction.ASSIGN_MENUS: return { ...state, menus: action.payload };
    
    case LayoutAction.CHANGE_ANCHOR: return { ...state, anchor: action.payload };
    case LayoutAction.CHANGE_ALERT: return { ...state, alert: action.payload };
    case LayoutAction.CHANGE_NOTIF_COUNT: return { ...state, notifCount: action.payload };
    case LayoutAction.CHANGE_VIEW: return { ...state, view: action.payload };
    
    case LayoutAction.DRAWER_MENU_SHOW: return { ...state, isDrawerMenuVisible: true };
    case LayoutAction.DRAWER_MENU_HIDE: return { ...state, isDrawerMenuVisible: false };
    case LayoutAction.DRAWER_ACTION_SHOW: return { ...state, isDrawerActionVisible: true };
    case LayoutAction.DRAWER_ACTION_HIDE: return { ...state, isDrawerActionVisible: false };
    case LayoutAction.DRAWER_TOP_SHOW: return { ...state, isDrawerTopVisible: true };
    case LayoutAction.DRAWER_TOP_HIDE: return { ...state, isDrawerTopVisible: false };
    case LayoutAction.DRAWER_BOTTOM_SHOW: return { ...state, isDrawerBottomVisible: true };
    case LayoutAction.DRAWER_BOTTOM_HIDE: return { ...state, isDrawerBottomVisible: false };
    
    case LayoutAction.LOGOUT_DIALOG_SHOW: return { ...state, isLogoutDialogVisible: true };
    case LayoutAction.LOGOUT_DIALOG_HIDE: return { ...state, isLogoutDialogVisible: false };
    case LayoutAction.NAV_BACK_SHOW: return { ...state, isNavBackVisible: true };
    case LayoutAction.NAV_BACK_HIDE: return { ...state, isNavBackVisible: false };

    case LayoutAction.ACCOUNT_EXPAND: return { ...state, isAccountExpanded: true };
    case LayoutAction.ACCOUNT_COLAPSE: return { ...state, isAccountExpanded: false };
    
    case LayoutAction.MODE_SEARCH_ON: return { ...state, isModeSearch: true };
    case LayoutAction.MODE_SEARCH_OFF: return { ...state, isModeSearch: false };
    case LayoutAction.MODE_LIST_ON: return { ...state, isModeList: true };
    case LayoutAction.MODE_LIST_OFF: return { ...state, isModeList: false };
    
    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };