import { IBasePayload } from '@generic/interfaces';
import { ISliderItemPatchPayload } from './ISliderItemPatchPayload';

export interface ISliderPatchPayload extends IBasePayload {
  item?: ISliderItemPatchPayload[];
}