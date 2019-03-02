import { IQueryCollectionState } from '@generic/interfaces';
import { IAnnouncementGetRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement/IAnnouncement';
import { Reducer } from 'redux';
import { AnnouncementAction as Action } from '../../actions/announcementActions';

const initialState: IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement> = {
  isExpired: false,
  isError: false,
  isLoading: false,
  request: undefined,
  response: undefined,
  errors: undefined
};

const reducer: Reducer<IQueryCollectionState<IAnnouncementGetRequest, IAnnouncement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.GET_REQUEST: return { ...state, isExpired: false, isLoading: true, isError: false, request: action.payload };
    case Action.GET_SUCCESS: return { ...state, isExpired: false, isLoading: false, isError: false, response: action.payload };
    case Action.GET_ERROR: return { ...state, isExpired: false, isLoading: false, isError: true, errors: action.payload };
    case Action.GET_DISPOSE: return { ...state, isExpired: true };

    default: { return state; }
  }
};

export { reducer as announcementGetReducer };