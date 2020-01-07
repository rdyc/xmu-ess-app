import { IWebJobPage } from '@webjob/classes/types';
import { WebJobPageAction as Action } from '@webjob/store/actions';
import { Reducer } from 'redux';

const initialState: IWebJobPage = {
  webJobPage: undefined
};

export const webJobPageReducer: Reducer<IWebJobPage> = (state = initialState, action) => {
  // console.log('action Webjob', action);

  switch (action.type) {
    case Action.CHANGE: return { webJobPage: action.payload };
    
    default: {
      return state;
    }
  }
};