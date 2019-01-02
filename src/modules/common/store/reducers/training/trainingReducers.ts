import {
  trainingGetAllReducer,
  trainingGetByIdReducer,
  trainingGetListReducer
} from '@common/store/reducers/training';

const trainingReducers = {
  commonTrainingAll: trainingGetAllReducer,
  commonTrainingList: trainingGetListReducer,
  commonTrainingDetail: trainingGetByIdReducer
};

export default trainingReducers;
