import { ILeavePage } from '@lookup/classes/types';
import { LookupLeaveAction as Action } from '@lookup/store/actions';
import { Reducer } from 'redux';

const initialState: ILeavePage = {
  leavePage: undefined
};

const reducer: Reducer<ILeavePage> = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE_PAGE: return { leavePage: action.payload };

    default: { return state; }
  }
};

export { reducer as lookupLeaveChangePageReducer };