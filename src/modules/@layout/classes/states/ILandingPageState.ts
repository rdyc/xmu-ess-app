import { IQuerySingleState } from '@generic/interfaces';
import { ILandingPageGetAllRequest } from '../queries';
import { ILandingPage } from '../response';

export interface ILandingPageState {
  landingPageGetAll: IQuerySingleState<ILandingPageGetAllRequest, ILandingPage>;
}