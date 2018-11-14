import { IAppBarState } from '@layout/interfaces/IAppBarState';
import { AppBarAction as Action } from '@layout/store/actions';
import { Reducer } from 'redux';

const initialState: IAppBarState = {
  menus: undefined,
  fields: undefined,
  selection: [],
  onClickMenu: () => { 
    console.warn('onClick must be handled'); 
  },
  onSearching: () => {
   console.warn('onSearch must be handled');
  },
  onSelectionClear: () => {
   console.warn('onClearSelection must be handled');
  },
  onSelectionProcess: () => {
    console.warn('onSelectionProcess must be handled');
   }
};

const selectionAddRemove = (current: string[], value: string) => {
  const result: string[] = current;

  const index = result.findIndex(item => item === value);

  if (index === -1) {
    result.push(value);
  } else {
    result.splice(index, 1);
  }

  return result;
};

const reducer: Reducer<IAppBarState> = (state = initialState, action) => {
  switch (action.type) {
    case Action.ASSIGN_MENUS: return { ...state, menus: action.payload };
    case Action.ASSIGN_MENU_CALLBACK: return { ...state, onClickMenu: action.payload };
    case Action.ASSIGN_SEARCH_CALLBACK: return { ...state, onSearching: action.payload };
    case Action.ASSIGN_SELECTION_CLEAR_CALLBACK: return { ...state, onSelectionClear: action.payload };
    case Action.ASSIGN_SELECTION_PROCESS_CALLBACK: return { ...state, onSelectionProcess: action.payload };
    case Action.ASSIGN_FIELDS: return { ...state, fields: action.payload };
    case Action.SELECTION_ADD_REMOVE: return { ...state, selection: selectionAddRemove(state.selection, action.payload) };
    case Action.SELECTION_CLEAR: return { ...state, selection: [] };
    case Action.DISPOSE: return { ...state, initialState };
    
    default: return state;
  }
};

export { reducer as appBarReducer };