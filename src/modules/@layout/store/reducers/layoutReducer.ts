import { Reducer } from 'redux';
import { LayoutAction } from '../../types';
import { ILayoutState } from '../../interfaces';

const initialState: ILayoutState = {
  anchor: 'left',
  menuDrawer: false,
  additionalDrawer: false,
  accountShow: false,
  topDrawer: false,
  bottomDrawer: false,
  menuItems: [],
  active: {
    menuUid: '',
    title: 'Home',
    subTitle: 'The home page'
  },
  user: null,
  notification: 0,
  logoutDialog: false,
  alertSnackbar: {
    open: false,
    message: null
  }
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
    case LayoutAction.SET_TOP_DRAWER: {
      return { ...state, opDrawer: action.payload };
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

    default: {
      return state;
    }
  }
};

export { reducer as layoutReducer };