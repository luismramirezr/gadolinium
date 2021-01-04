import { FetchStatus } from 'store/util/fetchStatus';
import { Category } from 'types/models';

export interface CategoriesState {
  fetchStatus: FetchStatus;
  saveStatus: FetchStatus;
  categories: Array<Category>;
  category: Category | null;
}
