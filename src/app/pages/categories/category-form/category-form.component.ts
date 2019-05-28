import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../service/category.service';
import { switchMap} from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  currentAction: String;
  categoryForm: FormGroup;
  pageTitle: String;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
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

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
      });
  }

  private loadCategory(){
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category) =>{
          this.category = category;
          this.categoryForm.patchValue(category); // binds loader category data to categoryForm
      },
        (error) => {
          alert('ocorreu um erro no servidor, tente mas tarde.');
        }
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastrar Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editar Categoria: ' + categoryName;
    }
  }

  private createCategory() {
    // Criando uam Category nova e atribuindo os valores de categoryForm a constante.
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
      .subscribe(
        data => this.actionsForSuccess(data),
        error => this.actionsForError(error)
      );
  }

  private updateCategory() {
    // Criando uam Category nova e atribuindo os valores de categoryForm a constante.
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category)
      .subscribe(
        data => this.actionsForSuccess(data),
        error => this.actionsForError(error)
      );
  }

  private actionsForSuccess(category: Category) {
    toastr.success('Solicitação processada com sucesso!');
    this.submittingForm = false;
    /* skipLocationChange: não salvar historico do navegador que passou na pagina
       redirect/reload componen page */
    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
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
