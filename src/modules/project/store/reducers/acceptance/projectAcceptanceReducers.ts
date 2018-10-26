import {
  projectAcceptanceGetAllReducer,
  projectAcceptanceGetByIdReducer,
  projectAcceptancePostReducer,
} from '@project/store/reducers/acceptance';

const projectAcceptanceReducers = {
  projectAcceptanceGetAll: projectAcceptanceGetAllReducer,
  projectAcceptanceGetById: projectAcceptanceGetByIdReducer,
  projectAcceptancePost: projectAcceptancePostReducer,
};

export default projectAcceptanceReducers;