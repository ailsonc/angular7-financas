import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource-service';
import { Entry } from '../models/entry.model';
import { CategoryService } from '../../categories/service/category.service';
import { map } from 'rxjs/operators'; 
import * as moment from "moment";

import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMounthAndYear(month: number, year: number): Observable<Entry[]> {
    // The in-memory database does not filter, it is issued by an API.
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries,month,year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number): Entry[] {
    return entries.filter( entry => {
      const entryData = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryData.month() + 1 == month;
      const yearMatches = entryData.year() == year;
      if(monthMatches && yearMatches) return entry;
    })
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

}
