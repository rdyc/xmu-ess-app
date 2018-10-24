import {
  projectSiteDeleteReducer,
  projectSiteGetReducer,
  projectSitePostReducer,
  projectSitePutReducer,
} from '@project/store/reducers/site';

const projectSiteReducers = {
  projectSiteGet: projectSiteGetReducer,
  projectSitePost: projectSitePostReducer,
  projectSitePut: projectSitePutReducer,
  projectSiteDelete: projectSiteDeleteReducer,
};

export default projectSiteReducers;