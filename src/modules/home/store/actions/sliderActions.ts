import { IResponseCollection } from '@generic/interfaces';
import { ISliderGetRequest, ISliderPatchRequest } from '@home/classes/queries/slider';
import { ISliderList } from '@home/classes/response/slider';
import { action } from 'typesafe-actions';

export const enum SliderAction {
  GET_REQUEST = '@@slider/GET_REQUEST',
  GET_SUCCESS = '@@slider/GET_SUCCESS',
  GET_ERROR = '@@slider/GET_ERROR',
  GET_DISPOSE = '@@slider/GET_DISPOSE',
  PATCH_REQUEST = '@@slider/PATCH_REQUEST',
  PATCH_SUCCESS = '@@slider/PATCH_SUCCESS',
  PATCH_ERROR = '@@slider/PATCH_ERROR',
  PATCH_DISPOSE = '@@slider/PATCH_DISPOSE'
}

// get all
export const sliderGetRequest = (request: ISliderGetRequest) => action(SliderAction.GET_REQUEST, request);
export const sliderGetSuccess = (response: IResponseCollection<ISliderList>) => action(SliderAction.GET_SUCCESS, response);
export const sliderGetError = (message: string) => action(SliderAction.GET_ERROR, message);
export const sliderGetDispose = () => action(SliderAction.GET_DISPOSE);

// post
export const sliderPatchRequest = (request: ISliderPatchRequest) => action(SliderAction.PATCH_REQUEST, request);
export const sliderPatchSuccess = (response: IResponseCollection<ISliderList>) => action(SliderAction.PATCH_SUCCESS, response);
export const sliderPatchError = (message: string) => action(SliderAction.PATCH_ERROR, message);
export const sliderPatchDispose = () => action(SliderAction.PATCH_DISPOSE);
