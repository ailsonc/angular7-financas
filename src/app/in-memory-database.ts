import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/model/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia' },
      { id: 4, name: 'Salário', description: 'Contra Cheque' }
    ];
    return {categories};
  }
}
