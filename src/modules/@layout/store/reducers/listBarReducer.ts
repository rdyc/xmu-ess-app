import { Reducer } from 'redux';

import { IListBarState } from '@layout/interfaces';
import { ListBarAction } from '@layout/types';

const initialState: IListBarState = {
  metadata: undefined,
  isReload: false,
  orderBy: undefined,
  direction: undefined,
  page: undefined,
  size: undefined,
  callbacks: {
    onNextCallback: () => { 
      console.log(`list bar onNext clicked`); 
    },
    onPrevCallback: () => { 
      console.log(`list bar onPrev clicked`); 
    },
    onSyncCallback: () => { 
      console.log(`list bar onSync clicked`); 
    },
    onAddCallback: () => { 
      console.log(`list bar onAdd clicked`); 
    },
    onOrderCallback: () => { 
      console.log(`list bar onOrder clicked`); 
    },
    onSortCallback: () => { 
      console.log(`list bar onSort clicked`); 
    },
  }
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
    
    default:
      return state;
  }
};

export { reducer as listBarReducer };