import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IKPIEmployeeGetAllRequest, 
  IKPIEmployeeGetByIdRequest, 
  IKPIEmployeeGetItemListRequest, 
  IKPIEmployeePostBulkRequest, 
  IKPIEmployeePostRequest,
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
  IKPIEmployee, 
  IKPIEmployeeDetail,
  IKPIEmployeeItem,
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
  kpiEmployeeGetAll: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
  kpiEmployeeGetById: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
  kpiEmployeeGetItemList: IQueryCollectionState<IKPIEmployeeGetItemListRequest, IKPIEmployeeItem>;
  kpiEmployeePost: IQuerySingleState<IKPIEmployeePostRequest, IKPIEmployee>;
  kpiEmployeePostBulk: IQueryCollectionState<IKPIEmployeePostBulkRequest, IKPIEmployee>;
  kpiEmployeePut: IQuerySingleState<IKPIEmployeePutRequest, IKPIEmployee>;
  kpiEmployeePutItemBulk: IQueryCollectionState<IKPIEmployeePutItemBulkRequest, IKPIEmployeeItem>;
  kpiEmployeePutFinal: IQuerySingleState<IKPIEmployeePutFinalRequest, IKPIEmployee>;

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