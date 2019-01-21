import { IAlert, ILayoutState } from '@layout/interfaces';
import { LayoutAction as Action } from '@layout/store/actions';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';
import { Reducer } from 'redux';

const initialState: ILayoutState = {
  theme: {
    palette: {
      primary: indigo,
      secondary: orange,
      type: 'light'
    },
    typography: {
      // fontSize: 14,
      useNextVariants: true,
    }
  },
  anchor: 'left',
  view: undefined,
  parentUrl: undefined,
  alerts: [],
  isModeSearch: false,
  isModeList: false,
  isAlertDialogVisible: false,
  isNavBackVisible: false,
  isSearchVisible: false,
  isMoreVisible: false
};

const alertAdd = (alerts: IAlert[], alert: any) => {
  if (alerts.length >= 0) {
    alerts.push(alert);
  } 

  return alerts;
};

const alertRemove = (alerts: IAlert[]) => {
  if (alerts.length >= 0) {
    alerts.splice(0, 1);
  } 

  return alerts;
};

const reducer: Reducer<ILayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case Action.THEME_CHANGE: return { ...state, theme: {
      palette: {
        ...state.theme.palette,
        type: state.theme.palette ? state.theme.palette.type === 'light' ? 'dark' : 'light' : undefined}
      }
    };

    case Action.ALERT_ADD: return { ...state, alerts: alertAdd(state.alerts, action.payload) };
    case Action.ALERT_DISSMIS: return { ...state, alerts: alertRemove(state.alerts) };

    case Action.CHANGE_ANCHOR: return { ...state, anchor: action.payload };
    case Action.CHANGE_NOTIF_COUNT: return { ...state, notifCount: action.payload };
    case Action.CHANGE_VIEW: return { ...state, view: action.payload };

    case Action.SETUP_VIEW: return { ...state, view: action.payload.view, parentUrl: action.payload.parentUrl, ...action.payload.status };
    
    case Action.ALERT_DIALOG_SHOW: return { ...state, isAlertDialogVisible: true };
    case Action.ALERT_DIALOG_HIDE: return { ...state, isAlertDialogVisible: false };
    case Action.NAV_BACK_SHOW: return { ...state, isNavBackVisible: true };
    case Action.NAV_BACK_HIDE: return { ...state, isNavBackVisible: false };
    case Action.SEARCH_SHOW: return { ...state, isSearchVisible: true };
    case Action.SEARCH_HIDE: return { ...state, isSearchVisible: false };
    case Action.MORE_SHOW: return { ...state, isMoreVisible: true };
    case Action.MORE_HIDE: return { ...state, isMoreVisible: false };

    case Action.ACCOUNT_EXPAND: return { ...state, isAccountExpanded: true };
    case Action.ACCOUNT_COLAPSE: return { ...state, isAccountExpanded: false };
    
    case Action.MODE_SEARCH_ON: return { ...state, isModeSearch: true };
    case Action.MODE_SEARCH_OFF: return { ...state, isModeSearch: false };
    case Action.MODE_LIST_ON: return { ...state, isModeList: true };
    case Action.MODE_LIST_OFF: return { ...state, isModeList: false };
    
    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };