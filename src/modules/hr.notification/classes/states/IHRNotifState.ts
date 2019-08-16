import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IPeriodDeleteRequest, 
  IPeriodGetAllRequest, 
  IPeriodGetByIdRequest, 
  IPeriodPostRequest, 
  IPeriodPutRequest 
} from '../queries/period';
import { 
  ISettingDeleteRequest, 
  ISettingGetAllRequest, 
  ISettingGetByIdRequest, 
  ISettingPostRequest, 
  ISettingPutRequest 
} from '../queries/setting';
import { 
  ITemplateDeleteRequest, 
  ITemplateGetAllRequest, 
  ITemplateGetByIdRequest, 
  ITemplateGetListRequest, 
  ITemplatePostRequest, 
  ITemplatePutRequest 
} from '../queries/template';
import { IPeriod, ISetting, ISettingDetail, ITemplate, ITemplateDetail } from '../response';

export interface IHRNotifState {
  // period
  periodGetAll: IQueryCollectionState<IPeriodGetAllRequest, IPeriod>;
  periodGetById: IQuerySingleState<IPeriodGetByIdRequest, IPeriod>;
  periodPost: IQuerySingleState<IPeriodPostRequest, IPeriod>;
  periodPut: IQuerySingleState<IPeriodPutRequest, IPeriod>;
  periodDelete: IQuerySingleState<IPeriodDeleteRequest, undefined>;

  // setting
  settingGetAll: IQueryCollectionState<ISettingGetAllRequest, ISetting>;
  settingGetById: IQuerySingleState<ISettingGetByIdRequest, ISettingDetail>;
  settingPost: IQuerySingleState<ISettingPostRequest, ISetting>;
  settingPut: IQuerySingleState<ISettingPutRequest, ISetting>;
  settingDelete: IQuerySingleState<ISettingDeleteRequest, undefined>;

  // template
  templateGetAll: IQueryCollectionState<ITemplateGetAllRequest, ITemplate>;
  templateGetList: IQueryCollectionState<ITemplateGetListRequest, ITemplate>;
  templateGetById: IQuerySingleState<ITemplateGetByIdRequest, ITemplateDetail>;
  templatePost: IQuerySingleState<ITemplatePostRequest, ITemplate>;
  templatePut: IQuerySingleState<ITemplatePutRequest, ITemplate>;
  templateDelete: IQuerySingleState<ITemplateDeleteRequest, undefined>;
}