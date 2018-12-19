import {
  IEmployeeAllRequest,
  IEmployeeByIdRequest,
  IEmployeeDeleteRequest,
  IEmployeeLeaveByIdRequest,
  IEmployeeListRequest,
  IEmployeePostRequest,
  IEmployeePutRequest,
} from '@account/classes/queries';
import { 
  IEmployee, 
  IEmployeeDetail, 
  IEmployeeLeave 
} from '@account/classes/response';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IEmployeeAccessHistoryAllRequest, 
  IEmployeeAccessHistoryByIdRequest, 
  IEmployeeAccessHistoryListRequest 
} from '../queries/employeeAccessHistory';
import { 
  IEmployeeEducationAllRequest, 
  IEmployeeEducationByIdRequest, 
  IEmployeeEducationDeleteRequest, 
  IEmployeeEducationListRequest, 
  IEmployeeEducationPostRequest, 
  IEmployeeEducationPutRequest 
} from '../queries/employeeEducation';
import { 
  IEmployeeExperienceAllRequest, 
  IEmployeeExperienceByIdRequest, 
  IEmployeeExperienceDeleteRequest, 
  IEmployeeExperienceListRequest, 
  IEmployeeExperiencePostRequest, 
  IEmployeeExperiencePutRequest 
} from '../queries/employeeExperience';
import { 
  IEmployeeAccessHistory, 
  IEmployeeAccessHistoryDetail, 
  IEmployeeAccessHistoryList
} from '../response/employeeAccessHistory';
import { 
  IEmployeeEducation, 
  IEmployeeEducationDetail, 
  IEmployeeEducationList 
} from '../response/employeeEducation';
import { 
  IEmployeeExperience, 
  IEmployeeExperienceDetail, 
  IEmployeeExperienceList 
} from '../response/employeeExperience';
import { IEmployeeMy } from '../response/IEmployeeMy';

export interface IAccountState {
  // account employee
  accountEmployeeGetAll: IQueryCollectionState<IEmployeeAllRequest, IEmployee>;
  accountEmployeeGetList: IQueryCollectionState<IEmployeeListRequest, IEmployee>;
  accountEmployeeGetById: IQuerySingleState<IEmployeeByIdRequest, IEmployeeDetail>;
  accountEmployeePost: IQuerySingleState<IEmployeePostRequest, IEmployee>;
  accountEmployeePut: IQuerySingleState<IEmployeePutRequest, IEmployee>;
  accountEmployeeDelete: IQuerySingleState<IEmployeeDeleteRequest, boolean>;
  
  // account employee access history
  accountEmployeeAccessHistoryGetAll: IQueryCollectionState<IEmployeeAccessHistoryAllRequest, IEmployeeAccessHistory>;
  accountEmployeeAccessHistoryGetList: IQueryCollectionState<IEmployeeAccessHistoryListRequest, IEmployeeAccessHistoryList>;
  accountEmployeeAccessHistoryGetById: IQuerySingleState<IEmployeeAccessHistoryByIdRequest, IEmployeeAccessHistoryDetail>;

  // account employee education
  accountEmployeeEducationGetAll: IQueryCollectionState<IEmployeeEducationAllRequest, IEmployeeEducation>;
  accountEmployeeEducationGetList: IQueryCollectionState<IEmployeeEducationListRequest, IEmployeeEducationList>;
  accountEmployeeEducationGetById: IQuerySingleState<IEmployeeEducationByIdRequest, IEmployeeEducationDetail>;
  accountEmployeeEducationPost: IQuerySingleState<IEmployeeEducationPostRequest, IEmployeeEducation>;
  accountEmployeeEducationPut: IQuerySingleState<IEmployeeEducationPutRequest, IEmployeeEducation>;
  accountEmployeeEducationDelete: IQuerySingleState<IEmployeeEducationDeleteRequest, boolean>;

  // account employee experience
  accountEmployeeExperienceGetAll: IQueryCollectionState<IEmployeeExperienceAllRequest, IEmployeeExperience>;
  accountEmployeeExperienceGetList: IQueryCollectionState<IEmployeeExperienceListRequest, IEmployeeExperienceList>;
  accountEmployeeExperienceGetById: IQuerySingleState<IEmployeeExperienceByIdRequest, IEmployeeExperienceDetail>;
  accountEmployeeExperiencePost: IQuerySingleState<IEmployeeExperiencePostRequest, IEmployeeExperience>;
  accountEmployeeExperiencePut: IQuerySingleState<IEmployeeExperiencePutRequest, IEmployeeExperience>;
  accountEmployeeExperienceDelete: IQuerySingleState<IEmployeeExperienceDeleteRequest, boolean>;
  
  accountEmployeeMyGet: IQuerySingleState<{}, IEmployeeMy>;

  accountEmployeeLeaveGet: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
}