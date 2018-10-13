import { siteGetAllReducer, siteGetByIdReducer, siteGetListReducer } from '@common/store/reducers/site';

const siteReducers = {
  commonSiteAll: siteGetAllReducer,
  commonSiteList: siteGetListReducer,
  commonSiteDetail: siteGetByIdReducer
};

export default siteReducers;