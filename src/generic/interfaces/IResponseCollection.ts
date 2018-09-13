import { IBaseData } from './IBaseData';
import { IBaseMetadata } from './IBaseMetadata';

export interface IResponseCollection<T> extends IBaseData<T> {
    metadata: IBaseMetadata;
}