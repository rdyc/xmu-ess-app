import {
  departmentGetAllReducer,
  departmentGetByIdReducer,
  departmentGetListReducer
} from '@common/store/reducers/department';

const departmentReducers = {
  commonDepartmentAll: departmentGetAllReducer,
  commonDepartmentList: departmentGetListReducer,
  commonDepartmentDetail: departmentGetByIdReducer
};

export default departmentReducers;
