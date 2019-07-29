import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IKPITemplateGetAllRequest, 
  IKPITemplateGetByIdRequest, 
  IKPITemplatePostRequest, 
  IKPITemplatePutRequest 
} from '../queries';
import { 
  IKPICategoryGetAllRequest, 
  IKPICategoryGetDetailRequest, 
  IKPICategoryGetListRequest, 
  IKPICategoryPostRequest, 
  IKPICategoryPutRequest 
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
  IKPITemplate, 
  IKPITemplateDetail 
} from '../response';
import { 
  IKPICategory, 
  IKPICategoryDetail, 
  IKPICategoryList 
} from '../response/category';
import { 
  IKPIMeasurement, 
  IKPIMeasurementDetail, 
  IKPIMeasurementList 
} from '../response/measurement';

export interface IKPIState {
  // template
  KPITemplateGetAll: IQueryCollectionState<IKPITemplateGetAllRequest, IKPITemplate>;
  KPITemplateGetById: IQuerySingleState<IKPITemplateGetByIdRequest, IKPITemplateDetail>;
  KPITemplatePost: IQuerySingleState<IKPITemplatePostRequest, IKPITemplate>;
  KPITemplatePut: IQuerySingleState<IKPITemplatePutRequest, IKPITemplate>;

  // measurement
  KPIMeasurementGetAll: IQueryCollectionState<IKPIMeasurementGetAllRequest, IKPIMeasurement>;
  KPIMeasurementGetByCategory: IQueryCollectionState<IKPIMeasurementGetByCategoryRequest, IKPIMeasurement>;
  KPIMeasurementGetList: IQueryCollectionState<IKPIMeasurementGetListRequest, IKPIMeasurementList>;
  KPIMeasurementGetById: IQuerySingleState<IKPIMeasurementGetDetailRequest, IKPIMeasurementDetail>;
  KPIMeasurementPost: IQuerySingleState<IKPIMeasurementPostRequest, IKPIMeasurement>;
  KPIMeasurementPut: IQuerySingleState<IKPIMeasurementPutRequest, IKPIMeasurement>;
  KPIMeasurementDelete: IQuerySingleState<IKPIMeasurementDeleteRequest, Boolean>;

  // category
  KPICategoryGetAll: IQueryCollectionState<IKPICategoryGetAllRequest, IKPICategory>;
  KPICategoryGetList: IQueryCollectionState<IKPICategoryGetListRequest, IKPICategoryList>;
  KPICategoryGetById: IQuerySingleState<IKPICategoryGetDetailRequest, IKPICategoryDetail>;
  KPICategoryPost: IQuerySingleState<IKPICategoryPostRequest, IKPICategory>;
  KPICategoryPut: IQuerySingleState<IKPICategoryPutRequest, IKPICategory>;
}