import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IHRTemplateGetAllRequest, IHRTemplateGetByIdRequest, IHRTemplatePostRequest, IHRTemplatePutRequest } from '../queries';
import { IHRMeasurementGetAllRequest, IHRMeasurementGetDetailRequest, IHRMeasurementPostRequest, IHRMeasurementPutRequest } from '../queries/measurement';
import { IHRTemplate, IHRTemplateDetail } from '../response';
import { IHRMeasurement, IHRMeasurementDetail } from '../response/measurement';

export interface IHRState {
  // template
  hrTemplateGetAll: IQueryCollectionState<IHRTemplateGetAllRequest, IHRTemplate>;
  hrTemplateGetById: IQuerySingleState<IHRTemplateGetByIdRequest, IHRTemplateDetail>;
  hrTemplatePost: IQuerySingleState<IHRTemplatePostRequest, IHRTemplate>;
  hrTemplatePut: IQuerySingleState<IHRTemplatePutRequest, IHRTemplate>;

  // measurement
  hrMeasurementGetAll: IQueryCollectionState<IHRMeasurementGetAllRequest, IHRMeasurement>;
  hrMeasurementGetById: IQuerySingleState<IHRMeasurementGetDetailRequest, IHRMeasurementDetail>;
  hrMeasurementPost: IQuerySingleState<IHRMeasurementPostRequest, IHRMeasurement>;
  hrMeasurementPut: IQuerySingleState<IHRMeasurementPutRequest, IHRMeasurement>;
}