import { IBaseDataList, IBaseMetadata } from '@generic/interfaces';

export interface IResponseCollection<T> extends IBaseDataList<T> {
    metadata: IBaseMetadata;
}