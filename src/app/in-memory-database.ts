import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/models/category.model';
import { Entry } from './pages/entries/models/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas' },
      { id: 2, name: 'Saúde', description: 'Plano de saúde' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia' },
      { id: 4, name: 'Salário', description: 'Contra Cheque' }
    ];
    const entries: Entry[] = [
      { id: 1, name: 'Gá de Cozinha', description: 'Brasilgás', categoryId: categories[0].id, category: categories[0], paid: true, date: '14/05/2019', amount: '70,80', type: 'expense' } as Entry,
      { id: 2, name: 'Aluguel', description: 'Alugue da casa', categoryId: categories[0].id, category: categories[0], paid: false, date: '14/05/2019', amount: '800,00', type: 'expense' } as Entry,
      { id: 3, name: 'Luz', description: 'Pagamentos de Contas', categoryId: categories[0].id, category: categories[0], paid: true, date: '14/05/2019', amount: '63,52', type: 'expense' } as Entry,
      { id: 4, name: 'Aguá', description: 'Pagamentos de Contas', categoryId: categories[0].id, category: categories[0], paid: false, date: '14/05/2019', amount: '90,10', type: 'expense' } as Entry,
      { id: 5, name: 'Cinema', description: 'Pagamentos de Contas', categoryId: categories[2].id, category: categories[2], paid: true, date: '14/05/2019', amount: '90,00', type: 'expense' } as Entry,
      { id: 6, name: 'Netflix', description: 'Pagamentos de Contas', categoryId: categories[2].id, category: categories[2], paid: true, date: '14/05/2019', amount: '29,99', type: 'expense' } as Entry,
      { id: 7, name: 'Cartão', description: 'Pagamentos de Contas', categoryId: categories[3].id, category: categories[3], paid: true, date: '14/05/2019', amount: '3010,30', type: 'expense' } as Entry,
      { id: 8, name: 'Uber', description: 'Transporte', categoryId: categories[3].id, category: categories[3], paid: true, date: '14/05/2019', amount: '230,41', type: 'expense' } as Entry,
      { id: 9, name: 'Remédio', description: 'Resfriado', categoryId: categories[1].id, category: categories[1], paid: false, date: '14/05/2019', amount: '90,30', type: 'expense' } as Entry,
      { id: 10, name: 'Consulta médica', description: 'Clinico', categoryId: categories[1].id, category: categories[1], paid: true, date: '14/05/2019', amount: '150,00', type: 'expense' } as Entry,
      { id: 11, name: 'Salário', description: 'Empresa X', categoryId: categories[1].id, category: categories[1], paid: true, date: '14/05/2019', amount: '4500,00', type: 'revenue' } as Entry
    ];
    return { categories, entries };
  }
}
