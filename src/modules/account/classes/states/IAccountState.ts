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
  IEmployeeAccessDeleteRequest, 
  IEmployeeAccessGetAllRequest, 
  IEmployeeAccessGetDetailRequest, 
  IEmployeeAccessGetListRequest,
  IEmployeeAccessPostRequest,
  IEmployeeAccessPutRequest
} from '@account/classes/queries/employeeAccess';
import { 
  IEmployeeAccessHistoryAllRequest, 
  IEmployeeAccessHistoryByIdRequest, 
  IEmployeeAccessHistoryListRequest 
} from '@account/classes/queries/employeeAccessHistory';
import { 
  IEmployeeEducationAllRequest, 
  IEmployeeEducationByIdRequest, 
  IEmployeeEducationDeleteRequest, 
  IEmployeeEducationListRequest, 
  IEmployeeEducationPostRequest, 
  IEmployeeEducationPutRequest 
} from '@account/classes/queries/employeeEducation';
import { 
  IEmployeeExperienceAllRequest, 
  IEmployeeExperienceByIdRequest, 
  IEmployeeExperienceDeleteRequest, 
  IEmployeeExperienceListRequest, 
  IEmployeeExperiencePostRequest, 
  IEmployeeExperiencePutRequest 
} from '@account/classes/queries/employeeExperience';
import { 
  IEmployeeFamilyAllRequest, 
  IEmployeeFamilyByIdRequest, 
  IEmployeeFamilyDeleteRequest, 
  IEmployeeFamilyListRequest, 
  IEmployeeFamilyPostRequest, 
  IEmployeeFamilyPutRequest 
} from '@account/classes/queries/employeeFamily';
import { 
  IEmployeeNoteAllRequest, 
  IEmployeeNoteByIdRequest, 
  IEmployeeNoteDeleteRequest, 
  IEmployeeNoteListRequest, 
  IEmployeeNotePostRequest, 
  IEmployeeNotePutRequest 
} from '@account/classes/queries/employeeNote';
import { 
  IEmployeeRateAllRequest, 
  IEmployeeRateByIdRequest, 
  IEmployeeRateListRequest, 
  IEmployeeRatePutRequest 
} from '@account/classes/queries/employeeRate';
import { 
  IEmployeeTrainingAllRequest, 
  IEmployeeTrainingByIdRequest, 
  IEmployeeTrainingDeleteRequest, 
  IEmployeeTrainingListRequest, 
  IEmployeeTrainingPostRequest, 
  IEmployeeTrainingPutRequest 
} from '@account/classes/queries/employeeTraining';
import { 
  IEmployee, 
  IEmployeeDetail,
  IEmployeeLeave 
} from '@account/classes/response';
import { 
  IEmployeeAccessHistory, 
  IEmployeeAccessHistoryDetail, 
  IEmployeeAccessHistoryList
} from '@account/classes/response/employeeAccessHistory';
import { 
  IEmployeeEducation, 
  IEmployeeEducationDetail, 
  IEmployeeEducationList 
} from '@account/classes/response/employeeEducation';
import { 
  IEmployeeExperience, 
  IEmployeeExperienceDetail, 
  IEmployeeExperienceList 
} from '@account/classes/response/employeeExperience';
import { 
  IEmployeeFamily, 
  IEmployeeFamilyDetail, 
  IEmployeeFamilyList 
} from '@account/classes/response/employeeFamily';
import { IEmployeeNote, IEmployeeNoteList } from '@account/classes/response/employeeNote';
import { 
  IEmployeeRate, 
  IEmployeeRateList 
} from '@account/classes/response/employeeRate';
import { 
  IEmployeeTraining, 
  IEmployeeTrainingList 
} from '@account/classes/response/employeeTraining';
import { IEmployeeMy } from '@account/classes/response/IEmployeeMy';
import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IEmployeeAccess, IEmployeeAccessList } from '../response/employeeAccess';

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
  
  // account employee family
  accountEmployeeFamilyGetAll: IQueryCollectionState<IEmployeeFamilyAllRequest, IEmployeeFamily>;
  accountEmployeeFamilyGetList: IQueryCollectionState<IEmployeeFamilyListRequest, IEmployeeFamilyList>;
  accountEmployeeFamilyGetById: IQuerySingleState<IEmployeeFamilyByIdRequest, IEmployeeFamilyDetail>;
  accountEmployeeFamilyPost: IQuerySingleState<IEmployeeFamilyPostRequest, IEmployeeFamily>;
  accountEmployeeFamilyPut: IQuerySingleState<IEmployeeFamilyPutRequest, IEmployeeFamily>;
  accountEmployeeFamilyDelete: IQuerySingleState<IEmployeeFamilyDeleteRequest, boolean>;
  
  // account employee training
  accountEmployeeTrainingGetAll: IQueryCollectionState<IEmployeeTrainingAllRequest, IEmployeeTraining>;
  accountEmployeeTrainingGetList: IQueryCollectionState<IEmployeeTrainingListRequest, IEmployeeTrainingList>;
  accountEmployeeTrainingGetById: IQuerySingleState<IEmployeeTrainingByIdRequest, IEmployeeTraining>;
  accountEmployeeTrainingPost: IQuerySingleState<IEmployeeTrainingPostRequest, IEmployeeTraining>;
  accountEmployeeTrainingPut: IQuerySingleState<IEmployeeTrainingPutRequest, IEmployeeTraining>;
  accountEmployeeTrainingDelete: IQuerySingleState<IEmployeeTrainingDeleteRequest, boolean>;

  // account employee rate
  accountEmployeeRateGetAll: IQueryCollectionState<IEmployeeRateAllRequest, IEmployeeRate>;
  accountEmployeeRateGetList: IQueryCollectionState<IEmployeeRateListRequest, IEmployeeRateList>;
  accountEmployeeRateGetById: IQuerySingleState<IEmployeeRateByIdRequest, IEmployeeRate>;
  accountEmployeeRatePut: IQuerySingleState<IEmployeeRatePutRequest, IEmployeeRate>;

  // account employee note
  accountEmployeeNoteGetAll: IQueryCollectionState<IEmployeeNoteAllRequest, IEmployeeNote>;
  accountEmployeeNoteGetList: IQueryCollectionState<IEmployeeNoteListRequest, IEmployeeNoteList>;
  accountEmployeeNoteGetById: IQuerySingleState<IEmployeeNoteByIdRequest, IEmployeeNote>;
  accountEmployeeNotePost: IQuerySingleState<IEmployeeNotePostRequest, IEmployeeNote>;
  accountEmployeeNotePut: IQuerySingleState<IEmployeeNotePutRequest, IEmployeeNote>;
  accountEmployeeNoteDelete: IQuerySingleState<IEmployeeNoteDeleteRequest, boolean>;
  
  accountEmployeeMyGet: IQuerySingleState<{}, IEmployeeMy>;

  accountEmployeeLeaveGet: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;

  // account employee Access
  accountEmployeeAccessGetAll: IQueryCollectionState<IEmployeeAccessGetAllRequest, IEmployeeAccess>;
  accountEmployeeAccessGetList: IQueryCollectionState<IEmployeeAccessGetListRequest, IEmployeeAccessList>;
  accountEmployeeAccessGetById: IQuerySingleState<IEmployeeAccessGetDetailRequest, IEmployeeAccess>;
  accountEmployeeAccessPost: IQuerySingleState<IEmployeeAccessPostRequest, IEmployeeAccess>;
  accountEmployeeAccessPut: IQuerySingleState<IEmployeeAccessPutRequest, IEmployeeAccess>;
  accountEmployeeAccessDelete: IQuerySingleState<IEmployeeAccessDeleteRequest, boolean>;
}