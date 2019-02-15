import { IQueryCollectionState } from '@generic/interfaces';
import { IAnnouncementPatchRequest } from '@home/classes/queries/announcement';
import { IAnnouncement } from '@home/classes/response/announcement';
import { AnnouncementAction as Action } from '@home/store/actions/announcementActions';
import { Reducer } from 'redux';

const initialState: IQueryCollectionState<IAnnouncementPatchRequest, IAnnouncement> = {
  request: undefined,
  response: undefined,
  isError: false,
  isLoading: false,
  errors: undefined,
};

const reducer: Reducer<IQueryCollectionState<IAnnouncementPatchRequest, IAnnouncement>> = (state = initialState, action) => {
  switch (action.type) {
    case Action.PATCH_REQUEST: return { ...state, isLoading: true, isError: false, request: action.payload };
    case Action.PATCH_SUCCESS: return { ...state, isLoading: false, isError: false, response: action.payload };
    case Action.PATCH_ERROR: return { ...state, isLoading: false, isError: true, errors: action.payload };
    case Action.PATCH_DISPOSE: return { ...state, ...initialState };

    default: return state; 
  }
};

export { reducer as announcementPatchReducer };