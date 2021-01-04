import api, { parseError } from 'services/api';
import { Category } from 'types/models';

export const getCategories = (): Promise<Array<Category>> =>
  api
    .get('/categories', { withCredentials: true })
    .then(response => response.data)
    .catch(parseError);
