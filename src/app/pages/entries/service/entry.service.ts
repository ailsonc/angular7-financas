import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/servide/base-resource-service';
import { Entry } from '../models/entry.model';
import { CategoryService } from '../../categories/service/category.service';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector);
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }

  protected jsonDataToResources(jsonData: any[]): Entry[] {
    /* Object.assign: método usado para copiar os valores de todas as propriedades próprias enumeráveis ​​de um ou mais
       objetos de origem para um objeto de destino. Ele retornará o objeto de destino. */
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }

  protected jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

}
