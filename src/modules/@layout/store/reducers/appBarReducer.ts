import { IAppBarState } from '@layout/interfaces/IAppBarState';
import { AppBarAction as Action } from '@layout/store/actions';
import { Reducer } from 'redux';

const initialState: IAppBarState = {
  menus: undefined,
  menuIsOpen: false,
  callback: () => { 
    console.warn('onClick must be handled'); 
  }
};

const reducer: Reducer<IAppBarState> = (state = initialState, action) => {
  switch (action.type) {
    case Action.ASSIGN_CALLBACK: return { ...state, callback: action.payload };
    case Action.ASSIGN_MENUS: return { ...state, menus: action.payload };
    case Action.MENU_SHOW: return { ...state, menuIsOpen: true };
    case Action.MENU_HIDE: return { ...state, menuIsOpen: false };
    case Action.DISPOSE: return state = initialState;
    
    default: return state;
  }
};

export { reducer as appBarReducer };