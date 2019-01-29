import { achievementGetReducer } from '.';
import { achievementPatchReducer } from './achievementPatchReducer';

const achievementReducers = {
  achievementGet: achievementGetReducer,
  achievementPatch: achievementPatchReducer
};

export default achievementReducers;