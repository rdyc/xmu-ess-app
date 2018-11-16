import { IPage, IPageState } from '@layout/classes/states';
import { PageAction as Action } from '@layout/store/actions';
import { Reducer } from 'redux';

const initialState: IPageState = {
  pages: []
};

const pageAdd = (pages: IPage[], page: IPage) => {
  const index = pages.findIndex(item => item.uid === page.uid);
  
  if (index === -1) {
    pages.push(page);
  } else {
    pages[index] = page;
  } 

  return pages;
};

export const pageReducer: Reducer<IPageState> = (state = initialState, action) => {
  switch (action.type) {
    case Action.CHANGE: return { ...state, pages: pageAdd(state.pages, action.payload) };
    
    default: {
      return state;
    }
  }
};