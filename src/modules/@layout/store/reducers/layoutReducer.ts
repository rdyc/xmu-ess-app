import { Reducer } from 'redux';

import { ILayoutState } from '../../interfaces';
import { LayoutAction } from '../../types';

const initialState: ILayoutState = {
  anchor: 'left',
  menuDrawer: false,
  additionalDrawer: false,
  accountShow: false,
  searchMode: false,
  listMode: false,
  topDrawer: false,
  bottomDrawer: false,
  menuItems: [],
  active: undefined,
  user: null,
  notification: 0,
  logoutDialog: false,
  alertSnackbar: {
    open: false,
    message: null
  },
  navBack: false
};

const reducer: Reducer<ILayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case LayoutAction.SET_ANCHOR: {
      return { ...state, anchor: action.payload };
    }
    case LayoutAction.SET_MENU_DRAWER: {
      return { ...state, menuDrawer: action.payload };
    }
    case LayoutAction.SET_ADDITIONAL_DRAWER: {
      return { ...state, additionalDrawer: action.payload };
    }
    case LayoutAction.SET_ACCOUNT_SHOW: {
      return { ...state, accountShow: action.payload };
    }
    case LayoutAction.SEARCH_MODE_ON: {
      return { ...state, searchMode: true };
    }
    case LayoutAction.SEARCH_MODE_OFF: {
      return { ...state, searchMode: false };
    }
    case LayoutAction.LIST_MODE_ON: {
      return { ...state, listMode: true };
    }
    case LayoutAction.LIST_MODE_OFF: {
      return { ...state, listMode: false };
    }
    case LayoutAction.SET_TOP_DRAWER: {
      return { ...state, topDrawer: action.payload };
    }
    case LayoutAction.SET_BOTTOM_DRAWER: {
      return { ...state, bottomDrawer: action.payload };
    }
    case LayoutAction.SET_MENU_ITEMS: {
      return { ...state, menuItems: action.payload };
    }
    case LayoutAction.SET_ACTIVE: {
      return { ...state, active: action.payload };
    }
    case LayoutAction.SET_USER: {
      return { ...state, user: action.payload };
    }
    case LayoutAction.SET_NOTIFICATION: {
      return { ...state, notification: action.payload };
    }
    case LayoutAction.SET_LOGOUT_DIALOG: {
      return { ...state, logoutDialog: action.payload };
    }
    case LayoutAction.SET_ALERT_SNACKBAR: {
      return { ...state, alertSnackbar: action.payload };
    }
    case LayoutAction.SET_NAV_BACK: {
      return { ...state, navBack: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };