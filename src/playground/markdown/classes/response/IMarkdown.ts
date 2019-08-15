import { IBaseChanges } from '@generic/interfaces';
import { IMarkdownCategory } from './category/IMarkdownCategory';

export interface IMarkdown {
  uid: string;
  title: string;
  category?: IMarkdownCategory;
  categoryUid: string;
  content: string;
  description?: string;
  changes?: IBaseChanges;
}