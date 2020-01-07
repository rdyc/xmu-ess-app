import { IBasePagingFilter } from '@generic/interfaces';

export interface IMarkdownGetAllFilter extends IBasePagingFilter {
  category?: string;  
}