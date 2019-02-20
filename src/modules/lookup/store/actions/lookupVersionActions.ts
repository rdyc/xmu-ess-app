import { IResponseCollection } from '@generic/interfaces';
import { ILookupVersionGetByIdRequest, ILookupVersionPatchRequest } from '@lookup/classes/queries';
import { ILookupVersion } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupVersionAction {
  GET_BY_ID_REQUEST = '@@lookup/version/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/version/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/version/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/version/GET_BY_ID_DISPOSE',
  PATCH_REQUEST = '@@lookup/version/PATCH_REQUEST',
  PATCH_SUCCESS = '@@lookup/version/PATCH_SUCCESS',
  PATCH_ERROR = '@@lookup/version/PATCH_ERROR',
  PATCH_DISPOSE = '@@lookup/version/PATCH_DISPOSE',
}

// get by id
export const lookupVersionGetByIdRequest = (request: ILookupVersionGetByIdRequest) => action(LookupVersionAction.GET_BY_ID_REQUEST, request);
export const lookupVersionGetByIdSuccess = (response: IResponseCollection<ILookupVersion>) => action(LookupVersionAction.GET_BY_ID_SUCCESS, response);
export const lookupVersionGetByIdError = (error: any) => action(LookupVersionAction.GET_BY_ID_ERROR, error);
export const lookupVersionGetByIdDispose = () => action(LookupVersionAction.GET_BY_ID_DISPOSE);

// patch
export const lookupVersionPatchRequest = (request: ILookupVersionPatchRequest) => action(LookupVersionAction.PATCH_REQUEST, request);
export const lookupVersionPatchSuccess = (response: IResponseCollection<ILookupVersion>) => action(LookupVersionAction.PATCH_SUCCESS, response);
export const lookupVersionPatchError = (error: any) => action(LookupVersionAction.PATCH_ERROR, error);
export const lookupVersionPatchDispose = () => action(LookupVersionAction.PATCH_DISPOSE);