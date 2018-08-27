import { Reducer } from 'redux';
import { AppUserState, AppUserActionTypes } from './types';

const initialState: AppUserState = {
  user: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<AppUserState> = (state = initialState, action) => {
  switch (action.type) {
    case AppUserActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, user: action.payload };
    }
    case AppUserActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, user: action.payload };
    }
    case AppUserActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as appUserReducer };