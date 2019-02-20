import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IGalleryGetAllRequest, IGalleryGetDetailRequest, IGalleryPostRequest } from '@lookup/classes/queries/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import { action } from 'typesafe-actions';

export const enum ImageGalleryAction {
  GET_ALL_REQUEST = '@@gallery/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@gallery/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@gallery/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@gallery/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@gallery/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@gallery/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@gallery/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@gallery/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@gallery/POST_REQUEST',
  POST_SUCCESS = '@@gallery/POST_SUCCESS',
  POST_ERROR = '@@gallery/POST_ERROR',
  POST_DISPOSE = '@@gallery/POST_DISPOSE',
}

// get all
export const imageGalleryGetAllRequest = (request: IGalleryGetAllRequest) => action(ImageGalleryAction.GET_ALL_REQUEST, request);
export const imageGalleryGetAllSuccess = (response: IResponseCollection<IGallery>) => action(ImageGalleryAction.GET_ALL_SUCCESS, response);
export const imageGalleryGetAllError = (error: any) => action(ImageGalleryAction.GET_ALL_ERROR, error);
export const imageGalleryGetAllDispose = () => action(ImageGalleryAction.GET_ALL_DISPOSE);

// get by id
export const imageGalleryGetByIdRequest = (request: IGalleryGetDetailRequest) => action(ImageGalleryAction.GET_BY_ID_REQUEST, request);
export const imageGalleryGetByIdSuccess = (response: IResponseSingle<IGallery>) => action(ImageGalleryAction.GET_BY_ID_SUCCESS, response);
export const imageGalleryGetByIdError = (error: any) => action(ImageGalleryAction.GET_BY_ID_ERROR, error);
export const imageGalleryGetByIdDispose = () => action(ImageGalleryAction.GET_BY_ID_DISPOSE);

// post
export const imageGalleryPostRequest = (request: IGalleryPostRequest) => action(ImageGalleryAction.POST_REQUEST, request);
export const imageGalleryPostSuccess = (response: IResponseSingle<IGallery>) => action(ImageGalleryAction.POST_SUCCESS, response);
export const imageGalleryPostError = (error: any) => action(ImageGalleryAction.POST_ERROR, error);
export const imageGalleryPostDispose = () => action(ImageGalleryAction.POST_DISPOSE);