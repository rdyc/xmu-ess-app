import { competencyGetAllReducer, competencyGetByIdReducer, competencyGetListReducer } from '@common/store/reducers/competency';

const competencyReducers = {
  commonCompetencyAll: competencyGetAllReducer,
  commonCompetencyList: competencyGetListReducer,
  commonCompetencyDetail: competencyGetByIdReducer
};

export default competencyReducers;