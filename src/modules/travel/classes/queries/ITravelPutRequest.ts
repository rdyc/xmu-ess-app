import { IBaseCommand } from '@generic/interfaces';
import { ITravelPutPayload } from '@travel/classes/request';

export interface ITravelPutRequest extends IBaseCommand<ITravelPutPayload> {
  companyUid: string;
  positionUid: string;
  travelUid: string;
}