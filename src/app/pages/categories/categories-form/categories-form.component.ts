import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../service/category.service';
import { switchMap} from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterContentChecked {
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

}
