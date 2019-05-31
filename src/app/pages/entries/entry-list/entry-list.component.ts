import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry: Entry) {
    const mustDelete = confirm('Deseja excluir esse item');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== entry),
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
