import { Reducer } from 'redux';

import { IListBarState, IListBarCallback } from '@layout/interfaces';
import { ListBarAction } from '@layout/store/actionCreators';

const _callbacks: IListBarCallback = {
  onNextCallback: () => { 
    console.warn('onNext must be handled'); 
  },
  onPrevCallback: () => { 
    console.warn('onPrev must be handled'); 
  },
  onSyncCallback: () => { 
    console.warn('onSync must be handled'); 
  },
  onAddCallback: () => { 
    console.warn('onAdd must be handled'); 
  },
  onOrderCallback: () => { 
    console.warn('onOrder must be handled'); 
  },
  onDirectionCallback: () => { 
    console.warn('onSort must be handled'); 
  },
  onSizeCallback: () => { 
    console.warn('onSize must be handled'); 
  },
};

const initialState: IListBarState = {
  metadata: undefined,
  isReload: false,
  orderBy: undefined,
  direction: undefined,
  page: undefined,
  size: undefined,
  callbacks: _callbacks,
  menuIsOpen: false,
  menuAnchorEl: undefined,
  menuItems: undefined
};

const reducer: Reducer<IListBarState> = (state = initialState, action) => {
  switch (action.type) {
    case ListBarAction.SET_METADATA:
      return { ...state, metadata: action.payload };

    case ListBarAction.SET_RELOAD:
      return { ...state, isReload: action.payload };

    case ListBarAction.SET_ORDER:
      return { ...state, isReload: true, orderBy: action.payload };

    case ListBarAction.SET_DIRECTION:
      return { ...state, isReload: true, direction: action.payload };

    case ListBarAction.SET_PAGE:
      return { ...state, isReload: true, page: action.payload };
    
    case ListBarAction.SET_SIZE:
      return { ...state, isReload: true, size: action.payload };

    case ListBarAction.ASSIGN_CALLBACKS: 
      return { ...state, callbacks: action.payload };

    case ListBarAction.CLEAR_CALLBACKS: 
      return { ...state, callbacks: _callbacks };

    case ListBarAction.ASSIGN_MENU_ITEMS: 
      return { ...state, menuItems: action.payload };

    case ListBarAction.CLEAR_MENU_ITEMS: 
      return { ...state, menuItems: undefined };

    case ListBarAction.MENU_SHOW: 
      return { ...state, menuIsOpen: true, menuAnchorEl: action.payload };

    case ListBarAction.MENU_HIDE: 
      return { ...state, menuIsOpen: false, menuAnchorEl: undefined };
    
    default:
      return state;
  }
};

export { reducer as listBarReducer };