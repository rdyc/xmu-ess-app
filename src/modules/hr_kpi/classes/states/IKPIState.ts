import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  // IEmployeeKPIGetAllRequest, 
  // IEmployeeKPIGetByIdRequest, 
  // IEmployeeKPIPostRequest, 
  // IEmployeeKPIPutRequest, 
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
  // IEmployeeKPI, 
  // IEmployeeKPIDetail,
  IKPITemplate,
  IKPITemplateDetail,
} from '../response';
import { 
  IKPICategory, 
  IKPICategoryDetail, 
  IKPICategoryList 
} from '../response/category';
import { 
  IKPIMeasurement, 
  IKPIMeasurementDetail, 
  IKPIMeasurementList,
} from '../response/measurement';

export interface IKPIState {
  // employee
  // employeeKPIGetAll: IQueryCollectionState<IEmployeeKPIGetAllRequest, IEmployeeKPI>;
  // employeeKPIGetById: IQuerySingleState<IEmployeeKPIGetByIdRequest, IEmployeeKPIDetail>;
  // employeeKPIPost: IQuerySingleState<IEmployeeKPIPostRequest, IEmployeeKPI>;
  // employeeKPIPut: IQuerySingleState<IEmployeeKPIPutRequest, IEmployeeKPI>;

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