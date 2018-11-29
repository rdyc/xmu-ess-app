import { unitGetAllReducer, unitGetByIdReducer, unitGetListReducer } from '@common/store/reducers/unit';

const unitReducers = {
  commonUnitAll: unitGetAllReducer,
  commonUnitList: unitGetListReducer,
  commonUnitDetail: unitGetByIdReducer
};

export default unitReducers;