import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';
import { Entry } from '../models/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(private entryService: EntryService) {
    super(entryService);
  }

}
