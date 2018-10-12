import { siteGetAllReducer, siteGetByIdReducer, siteGetListReducer } from '@common/store/reducers/site';

const siteReducers = {
  commonSiteGetAll: siteGetAllReducer,
  commonSiteGetList: siteGetListReducer,
  commonSiteGetById: siteGetByIdReducer
};

export default siteReducers;