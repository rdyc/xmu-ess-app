import { IHrCornerBlogGetAllByCategoryFilter } from '@hr/classes/filters';

export interface IHrCornerBlogGetAllByCategoryRequest {
  categorySlug: string;
  filter?: IHrCornerBlogGetAllByCategoryFilter;
}