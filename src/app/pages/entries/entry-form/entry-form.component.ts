import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Entry } from '../models/entry.model';
import { EntryService } from '../service/entry.service';
import { switchMap} from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: String;
  entryForm: FormGroup;
  pageTitle: String;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(private entryService: EntryService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  // Private Methods
  private setCurrentAction(){
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }

  }

  private buildEntryForm(){
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
      });
  }

  private loadEntry(){
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe(
        (entry) =>{
          this.entry = entry;
          this.entryForm.patchValue(entry); // binds loader entry data to entryForm
      },
        (error) => {
          alert('ocorreu um erro no servidor, tente mas tarde.');
        }
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastrar de Novo Lançamento';
    } else {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editar Lançamento: ' + entryName;
    }
  }

  private createEntry() {
    // Criando uam Entry nova e atribuindo os valores de entryForm a constante.
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry)
      .subscribe(
        data => this.actionsForSuccess(data),
        error => this.actionsForError(error)
      );
  }

  private updateEntry() {
    // Criando uam Entry nova e atribuindo os valores de entryForm a constante.
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
      .subscribe(
        data => this.actionsForSuccess(data),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(entry: Entry) {
    toastr.success('Solicitação processada com sucesso!');
    this.submittingForm = false;
    /* skipLocationChange: não salvar historico do navegador que passou na pagina
       redirect/reload componen page */
    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    );
  }

  private actionsForError(error) {
    toastr.error('Ocorreu um erro ao processada sua solicitação');
    this.submittingForm = false;
    if (error.status === 422) {
      // this.serverErrorMessages = JSON.parse(error._body).erros;
      this.serverErrorMessages = ['Falha na comunicação com o servidor, Por favor, tente mais tarde.'];
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor, Por favor, tente mais tarde.'];
    }
  }

}