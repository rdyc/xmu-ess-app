import { IResponseSingle } from '@generic/interfaces';
import { ILandingPageGetAllRequest } from '@layout/classes/queries';
import { ILandingPage } from '@layout/classes/response';
import { action } from 'typesafe-actions';

export const enum LandingPageAction {
  GET_ALL_REQUEST = '@@landing-page/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@landing-page/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@landing-page/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@landing-page/GET_ALL_DISPOSE',
}

export const landingPageGetAllRequest = (request: ILandingPageGetAllRequest) => action(LandingPageAction.GET_ALL_REQUEST, request);
export const landingPageGetAllSuccess = (response: IResponseSingle<ILandingPage>) => action(LandingPageAction.GET_ALL_SUCCESS, response);
export const landingPageGetAllError = (message: string) => action(LandingPageAction.GET_ALL_ERROR, message);
export const landingPageGetAllDispose = () => action(LandingPageAction.GET_ALL_DISPOSE);