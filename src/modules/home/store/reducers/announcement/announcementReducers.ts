import { announcementGetReducer } from '.';
import { announcementPatchReducer } from './announcementPatchReducer';

const announcementReducers = {
  announcementGet: announcementGetReducer,
  announcementPatch: announcementPatchReducer,
};

export default announcementReducers;