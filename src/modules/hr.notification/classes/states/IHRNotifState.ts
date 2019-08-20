import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  INotifPeriodDeleteRequest, 
  INotifPeriodGetAllRequest, 
  INotifPeriodGetByIdRequest, 
  INotifPeriodPostRequest, 
  INotifPeriodPutRequest 
} from '../queries/period';
import { 
  INotifSettingDeleteRequest, 
  INotifSettingGetAllRequest, 
  INotifSettingGetByIdRequest, 
  INotifSettingPostRequest, 
  INotifSettingPutRequest 
} from '../queries/setting';
import { 
  INotifTemplateDeleteRequest, 
  INotifTemplateGetAllRequest, 
  INotifTemplateGetByIdRequest, 
  INotifTemplateGetListRequest, 
  INotifTemplatePostRequest, 
  INotifTemplatePutRequest 
} from '../queries/template';
import { INotifPeriod, INotifSetting, INotifSettingDetail, INotifTemplate, INotifTemplateDetail, INotifTemplateList } from '../response';

export interface IHRNotifState {
  // period
  periodGetAll: IQueryCollectionState<INotifPeriodGetAllRequest, INotifPeriod>;
  periodGetById: IQuerySingleState<INotifPeriodGetByIdRequest, INotifPeriod>;
  periodPost: IQuerySingleState<INotifPeriodPostRequest, INotifPeriod>;
  periodPut: IQuerySingleState<INotifPeriodPutRequest, INotifPeriod>;
  periodDelete: IQuerySingleState<INotifPeriodDeleteRequest, undefined>;

  // setting
  settingGetAll: IQueryCollectionState<INotifSettingGetAllRequest, INotifSetting>;
  settingGetById: IQuerySingleState<INotifSettingGetByIdRequest, INotifSettingDetail>;
  settingPost: IQuerySingleState<INotifSettingPostRequest, INotifSetting>;
  settingPut: IQuerySingleState<INotifSettingPutRequest, INotifSetting>;
  settingDelete: IQuerySingleState<INotifSettingDeleteRequest, undefined>;

  // template
  templateGetAll: IQueryCollectionState<INotifTemplateGetAllRequest, INotifTemplate>;
  templateGetList: IQueryCollectionState<INotifTemplateGetListRequest, INotifTemplateList>;
  templateGetById: IQuerySingleState<INotifTemplateGetByIdRequest, INotifTemplateDetail>;
  templatePost: IQuerySingleState<INotifTemplatePostRequest, INotifTemplate>;
  templatePut: IQuerySingleState<INotifTemplatePutRequest, INotifTemplate>;
  templateDelete: IQuerySingleState<INotifTemplateDeleteRequest, undefined>;
}