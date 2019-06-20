import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IHRTemplateGetAllRequest, IHRTemplateGetByIdRequest, IHRTemplatePostRequest, IHRTemplatePutRequest } from '../queries';
import { IHRMeasurementGetAllRequest, IHRMeasurementGetDetailRequest, IHRMeasurementGetListRequest, IHRMeasurementPostRequest, IHRMeasurementPutRequest } from '../queries/measurement';
import { IHRTemplate, IHRTemplateDetail } from '../response';
import { IHRMeasurement, IHRMeasurementDetail, IHRMeasurementList } from '../response/measurement';

export interface IHRState {
  // template
  hrTemplateGetAll: IQueryCollectionState<IHRTemplateGetAllRequest, IHRTemplate>;
  hrTemplateGetById: IQuerySingleState<IHRTemplateGetByIdRequest, IHRTemplateDetail>;
  hrTemplatePost: IQuerySingleState<IHRTemplatePostRequest, IHRTemplate>;
  hrTemplatePut: IQuerySingleState<IHRTemplatePutRequest, IHRTemplate>;

  // measurement
  hrMeasurementGetAll: IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement>;
  hrMeasurementGetList: IQueryCollectionState<IHRMeasurementGetListRequest, IHRMeasurementList>;
  hrMeasurementGetById: IQuerySingleState<IHRMeasurementGetDetailRequest, IHRMeasurementDetail>;
  hrMeasurementPost: IQuerySingleState<IHRMeasurementPostRequest, IHRMeasurement>;
  hrMeasurementPut: IQuerySingleState<IHRMeasurementPutRequest, IHRMeasurement>;
}