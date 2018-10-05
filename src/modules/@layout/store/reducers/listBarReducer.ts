import { Reducer } from 'redux';

import { IListBarState, IListBarCallback } from '@layout/interfaces';
import { ListBarAction } from '@layout/store/actions';

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
  isLoading: false,
  orderBy: undefined,
  direction: undefined,
  page: undefined,
  size: undefined,
  callbacks: _callbacks,
  menuIsOpen: false,
  menuAnchorId: undefined,
  fields: undefined
};

const reducer: Reducer<IListBarState> = (state = initialState, action) => {
  switch (action.type) {
    case ListBarAction.ASSIGN_METADATA:
      return { ...state, metadata: action.payload };
      
    case ListBarAction.ASSIGN_CALLBACKS: 
      return { ...state, callbacks: action.payload };
  
    case ListBarAction.ASSIGN_FIELDS: 
      return { ...state, fields: action.payload };

    case ListBarAction.CHANGE_ORDER:
      return { ...state, isLoading: true, orderBy: action.payload };

    case ListBarAction.CHANGE_DIRECTION:
      return { ...state, isLoading: true, direction: action.payload };
    
    case ListBarAction.CHANGE_SIZE:
      return { ...state, isLoading: true, size: action.payload };

    case ListBarAction.MENU_SHOW: 
      return { ...state, menuIsOpen: true, menuAnchorId: action.payload };

    case ListBarAction.MENU_HIDE: 
      return { ...state, menuIsOpen: false, menuAnchorId: undefined };

    case ListBarAction.LOADING:
      return { ...state, isLoading: action.payload };

    // case ListBarAction.DISPOSE:
    //   return initialState;
    
    default:
      return state;
  }
};

export { reducer as listBarReducer };