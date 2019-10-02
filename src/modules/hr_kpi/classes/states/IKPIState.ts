import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IEmployeeKPIGetAllRequest, 
  IKPIApprovalGetAllRequest, 
  IKPIApprovalGetByIdRequest, 
  IKPIApprovalPostRequest, 
  IKPIAssignGetAllRequest,
  IKPIAssignGetByIdRequest,
  IKPIAssignGetByYearRequest,
  IKPIAssignPostBulkRequest,
  IKPIAssignPutRequest,
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeePostRequest,
  IKPIEmployeePutRequest,
  IKPIFinalGetAllRequest,
  IKPIFinalGetByIdRequest,
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
  IEmployeeKPI, 
  IKPIAssign,
  IKPIAssignDetail,
  IKPICategory,
  IKPICategoryDetail,
  IKPICategoryList,
  IKPIEmployee,
  IKPIEmployeeDetail, 
  IKPIFinal,
  IKPIFinalDetail, 
  IKPIMeasurement, 
  IKPIMeasurementDetail,
  IKPIMeasurementList,
  IKPITemplate,
  IKPITemplateDetail,
} from '../response';

export interface IKPIState {
  // employee
  employeeKPIGetAll: IQueryCollectionState<IEmployeeKPIGetAllRequest, IEmployeeKPI>;

  // employee
  kpiEmployeeGetAll: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
  kpiEmployeeGetById: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
  kpiEmployeePost: IQueryCollectionState<IKPIEmployeePostRequest, IKPIEmployee>;
  kpiEmployeePut: IQuerySingleState<IKPIEmployeePutRequest, IKPIEmployee>;
  
  // approval
  kpiApprovalGetAll: IQueryCollectionState<IKPIApprovalGetAllRequest, IKPIEmployee>;
  kpiApprovalGetById: IQuerySingleState<IKPIApprovalGetByIdRequest, IKPIEmployeeDetail>;
  kpiApprovalPost: IQueryCollectionState<IKPIApprovalPostRequest, IKPIEmployee>;

  // final
  kpiFinalGetAll: IQueryCollectionState<IKPIFinalGetAllRequest, IKPIFinal>;
  kpiFinalGetById: IQuerySingleState<IKPIFinalGetByIdRequest, IKPIFinalDetail>;
  
  // assign
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