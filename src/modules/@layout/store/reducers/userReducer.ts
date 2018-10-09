import { IUserState } from '@layout/interfaces';
import { UserAction as Action } from '@layout/store/actions';
import { Reducer } from 'redux';

const initialState: IUserState = {
  user: undefined
};

const reducer: Reducer<IUserState> = (state = initialState, action) => {
  switch (action.type) {
    case Action.ASSIGN_USER: return { ...state, user: action.payload };
    
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };