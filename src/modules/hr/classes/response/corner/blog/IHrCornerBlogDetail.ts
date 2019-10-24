import { IBlogCategory } from './IBlogCategory';

export interface IHrCornerBlogDetail {
  content: string;
  category: IBlogCategory;
  title: string;
  slug: string;
  headline: string;
  publishedBy: string;
  publishedAt: string;
}