import { IQueryCollectionState } from '@generic/interfaces';
import { ISliderGetRequest, ISliderPatchRequest } from '../queries/slider';
import { ISliderList } from '../response/slider';

export interface ISliderState {
  sliderGet: IQueryCollectionState<ISliderGetRequest, ISliderList>;
  sliderPatch: IQueryCollectionState<ISliderPatchRequest, ISliderList>;
}
