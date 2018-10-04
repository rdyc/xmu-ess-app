import { IBaseQuery, IResponseSingle } from '@generic/interfaces';

export interface IBaseSingleQuery<TReq, TRes> extends IBaseQuery {
  readonly request: TReq | undefined;
  readonly response: IResponseSingle<TRes> | undefined;
}