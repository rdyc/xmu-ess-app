import { IBaseMetadata, IBaseDataList } from '@generic/interfaces';

export interface IResponseCollection<T> extends IBaseDataList<T> {
    metadata: IBaseMetadata;
}