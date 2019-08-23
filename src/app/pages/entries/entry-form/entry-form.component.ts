import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Entry } from '../models/entry.model';
import { EntryService } from '../service/entry.service';
import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/service/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {
  categories: Array<Category>;

  amountMask = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '', // any single char
    padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: ','  // fractional delimiter
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };
  
  constructor(protected entryService: EntryService, protected categoryService: CategoryService, protected injector: Injector) {
    super(new Entry, injector, entryService, Entry.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          value: value,
          text: text
        };
      }
    );
 }

 protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
      });
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  protected creationPageTitle(): String {
    return 'Cadastrar de Novo Lançamento';
  }

  protected editionPageTitle(): String {
    const entryName = this.resource.name || '';
    return 'Editar Lançamento: ' + entryName;
  }

}
