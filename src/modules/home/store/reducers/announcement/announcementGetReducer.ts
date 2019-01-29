import { IQueryCollectionState } from '@generic/interfaces';
import { IAnnouncementGetRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement/IAnnouncement';
import { Reducer } from 'redux';
import { AnnouncementAction as Action } from '../../actions/announcementActions';

const initialState: IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return initialState;

    default: { return state; }
  }
};

export { reducer as announcementGetReducer };