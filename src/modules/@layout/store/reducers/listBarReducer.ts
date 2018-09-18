import { Reducer } from 'redux';

import { IListBarState } from '@layout/interfaces';
import { ListBarAction } from '@layout/types';

const initialState: IListBarState = {
  isReload: false,
  metadata: undefined,
};

const reducer: Reducer<IListBarState> = (state = initialState, action) => {
  switch (action.type) {
    case ListBarAction.SET_RELOAD:
      return { ...state, isReload: action.payload };

    case ListBarAction.SET_METADATA:
      return { ...state, metadata: action.payload };

    default:
      return state;
  }
};

export { reducer as listBarReducer };