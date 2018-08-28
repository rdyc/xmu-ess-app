import { BaseDataType } from './BaseDataType';
import { BaseMetadataType } from './BaseMetadataType';

export interface CollectionResponseType<T> extends BaseDataType<T> {
    metadata: BaseMetadataType;
}