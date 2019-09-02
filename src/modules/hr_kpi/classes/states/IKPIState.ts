import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IKPIAssignGetAllRequest, 
  IKPIAssignGetByIdRequest, 
  IKPIAssignGetByYearRequest, 
  IKPIAssignPostBulkRequest, 
  IKPIAssignPutRequest,
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeeGetItemListRequest,
  IKPIEmployeePostBulkRequest,
  IKPIEmployeePostRequest,
  IKPIEmployeePutAchievedRequest,
  IKPIEmployeePutFinalRequest,
  IKPIEmployeePutItemBulkRequest,
  IKPIEmployeePutRequest,
  IKPITemplateGetAllRequest,
  IKPITemplateGetByIdRequest,
  IKPITemplateGetListRequest,
  IKPITemplatePostRequest,
  IKPITemplatePutRequest,
} from '../queries';
import { 
  IKPICategoryGetAllRequest, 
  IKPICategoryGetDetailRequest, 
  IKPICategoryGetListRequest, 
  IKPICategoryMeasurementPostRequest, 
  IKPICategoryPostRequest, 
  IKPICategoryPutRequest,
} from '../queries/category';
import { 
  IKPIMeasurementDeleteRequest, 
  IKPIMeasurementGetAllRequest, 
  IKPIMeasurementGetByCategoryRequest, 
  IKPIMeasurementGetDetailRequest, 
  IKPIMeasurementGetListRequest, 
  IKPIMeasurementPostRequest, 
  IKPIMeasurementPutRequest 
} from '../queries/measurement';
import { 
  IKPIAssign, 
  IKPIAssignDetail,
  IKPICategory,
  IKPICategoryDetail,
  IKPICategoryList,
  IKPIEmployee,
  IKPIEmployeeDetail,
  IKPIEmployeeItem, 
  IKPIMeasurement, 
  IKPIMeasurementDetail,
  IKPIMeasurementList, 
  IKPITemplate, 
  IKPITemplateDetail,
} from '../response';

export interface IKPIState {
  // assign
  kpiEmployeeGetAll: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
  kpiEmployeeGetById: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
  kpiEmployeeGetItemList: IQueryCollectionState<IKPIEmployeeGetItemListRequest, IKPIEmployeeItem>;
  kpiEmployeePost: IQuerySingleState<IKPIEmployeePostRequest, IKPIEmployee>;
  kpiEmployeePostBulk: IQueryCollectionState<IKPIEmployeePostBulkRequest, IKPIEmployee>;
  kpiEmployeePut: IQuerySingleState<IKPIEmployeePutRequest, IKPIEmployee>;
  kpiEmployeePutAchieved: IQuerySingleState<IKPIEmployeePutAchievedRequest, IKPIEmployee>;
  kpiEmployeePutItemBulk: IQueryCollectionState<IKPIEmployeePutItemBulkRequest, IKPIEmployeeItem>;
  kpiEmployeePutFinal: IQuerySingleState<IKPIEmployeePutFinalRequest, IKPIEmployee>;

  // employee
  kpiAssignGetAll: IQueryCollectionState<IKPIAssignGetAllRequest, IKPIAssign>;
  kpiAssignGetById: IQuerySingleState<IKPIAssignGetByIdRequest, IKPIAssignDetail>;
  kpiAssignGetByYear: IQuerySingleState<IKPIAssignGetByYearRequest, IKPIAssign>;
  kpiAssignPostBulk: IQueryCollectionState<IKPIAssignPostBulkRequest, IKPIAssign>;
  kpiAssignPut: IQuerySingleState<IKPIAssignPutRequest, IKPIAssign>;

  // template
  kpiTemplateGetAll: IQueryCollectionState<IKPITemplateGetAllRequest, IKPITemplate>;
  kpiTemplateGetList: IQueryCollectionState<IKPITemplateGetListRequest, IKPITemplate>;
  kpiTemplateGetById: IQuerySingleState<IKPITemplateGetByIdRequest, IKPITemplateDetail>;
  kpiTemplatePost: IQuerySingleState<IKPITemplatePostRequest, IKPITemplate>;
  kpiTemplatePut: IQuerySingleState<IKPITemplatePutRequest, IKPITemplate>;

  // measurement
  kpiMeasurementGetAll: IQueryCollectionState<IKPIMeasurementGetAllRequest, IKPIMeasurement>;
  kpiMeasurementGetByCategory: IQueryCollectionState<IKPIMeasurementGetByCategoryRequest, IKPIMeasurement>;
  kpiMeasurementGetList: IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList>;
  kpiMeasurementGetById: IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail>;
  kpiMeasurementPost: IQuerySingleState<IKPIMeasurementPostRequest, IKPIMeasurement>;
  kpiMeasurementPut: IQuerySingleState<IKPIMeasurementPutRequest, IKPIMeasurement>;
  kpiMeasurementDelete: IQuerySingleState<IKPIMeasurementDeleteRequest, Boolean>;

  // category
  kpiCategoryGetAll: IQueryCollectionState<IKPICategoryGetAllRequest, IKPICategory>;
  kpiCategoryGetList: IQueryCollectionState<IKPICategoryGetListRequest, IKPICategoryList>;
  kpiCategoryGetById: IQuerySingleState<IKPICategoryGetDetailRequest, IKPICategoryDetail>;
  kpiCategoryPost: IQuerySingleState<IKPICategoryPostRequest, IKPICategory>;
  kpiCategoryMeasurementPost: IQuerySingleState<IKPICategoryMeasurementPostRequest, IKPICategory>;
  kpiCategoryPut: IQuerySingleState<IKPICategoryPutRequest, IKPICategory>;
}