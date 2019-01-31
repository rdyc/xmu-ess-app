import { IBaseCommand } from '@generic/interfaces';
import { ILookupVersionPatchPayload } from '@lookup/classes/request';

export interface ILookupVersionPatchRequest extends IBaseCommand<ILookupVersionPatchPayload> {
  clientId: string;
}