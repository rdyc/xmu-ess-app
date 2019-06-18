import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IGalleryGetAllRequest, IGalleryGetDetailRequest, IGalleryPostRequest } from '@lookup/classes/queries/gallery';
import { IGallery } from '@lookup/classes/response/gallery';
import { action } from 'typesafe-actions';

export const enum ImageGalleryAction {
  GET_ALL_REQUEST = '@@lookup/gallery/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/gallery/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/gallery/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/gallery/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/gallery/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/gallery/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/gallery/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/gallery/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/gallery/POST_REQUEST',
  POST_SUCCESS = '@@lookup/gallery/POST_SUCCESS',
  POST_ERROR = '@@lookup/gallery/POST_ERROR',
  POST_DISPOSE = '@@lookup/gallery/POST_DISPOSE',
}

// get all
export const lookupImageGalleryGetAllRequest = (request: IGalleryGetAllRequest) => action(ImageGalleryAction.GET_ALL_REQUEST, request);
export const lookupImageGalleryGetAllSuccess = (response: IResponseCollection<IGallery>) => action(ImageGalleryAction.GET_ALL_SUCCESS, response);
export const lookupImageGalleryGetAllError = (error: any) => action(ImageGalleryAction.GET_ALL_ERROR, error);
export const lookupImageGalleryGetAllDispose = () => action(ImageGalleryAction.GET_ALL_DISPOSE);

// get by id
export const lookupImageGalleryGetByIdRequest = (request: IGalleryGetDetailRequest) => action(ImageGalleryAction.GET_BY_ID_REQUEST, request);
export const lookupImageGalleryGetByIdSuccess = (response: IResponseSingle<IGallery>) => action(ImageGalleryAction.GET_BY_ID_SUCCESS, response);
export const lookupImageGalleryGetByIdError = (error: any) => action(ImageGalleryAction.GET_BY_ID_ERROR, error);
export const lookupImageGalleryGetByIdDispose = () => action(ImageGalleryAction.GET_BY_ID_DISPOSE);

// post
export const lookupImageGalleryPostRequest = (request: IGalleryPostRequest) => action(ImageGalleryAction.POST_REQUEST, request);
export const lookupImageGalleryPostSuccess = (response: IResponseSingle<IGallery>) => action(ImageGalleryAction.POST_SUCCESS, response);
export const lookupImageGalleryPostError = (error: any) => action(ImageGalleryAction.POST_ERROR, error);
export const lookupImageGalleryPostDispose = () => action(ImageGalleryAction.POST_DISPOSE);