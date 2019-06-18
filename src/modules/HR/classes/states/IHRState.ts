import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IHRTemplateGetAllRequest, IHRTemplateGetByIdRequest, IHRTemplatePostRequest, IHRTemplatePutRequest } from '../queries';
import { IHRTemplate, IHRTemplateDetail } from '../response';

export interface IHRState {
  // template
  hrTemplateGetAll: IQueryCollectionState<IHRTemplateGetAllRequest, IHRTemplate>;
  hrTemplateGetById: IQuerySingleState<IHRTemplateGetByIdRequest, IHRTemplateDetail>;
  hrTemplatePost: IQuerySingleState<IHRTemplatePostRequest, IHRTemplate>;
  hrTemplatePut: IQuerySingleState<IHRTemplatePutRequest, IHRTemplate>;
}