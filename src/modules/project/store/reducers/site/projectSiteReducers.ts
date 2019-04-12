import {
  projectSiteGetReducer,
  projectSitePatchReducer
} from '@project/store/reducers/site';

const projectSiteReducers = {
  projectSiteGet: projectSiteGetReducer,
  projectSitePatch: projectSitePatchReducer
};

export default projectSiteReducers;