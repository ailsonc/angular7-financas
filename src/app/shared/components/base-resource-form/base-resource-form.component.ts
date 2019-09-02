import { AfterContentChecked, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource-service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
    currentAction: String;
    resourceForm: FormGroup;
    pageTitle: String;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        public resource: T,
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.formBuilder = injector.get(FormBuilder);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    // Protected Methods
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    protected abstract buildResourceForm(): void;

    protected loadResource() {
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get('id')))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource); // binds loader resource data to resourceForm
                },
                (error) => {
                    alert('ocorreu um erro no servidor, tente mas tarde.');
                }
            );
        }
    }

    protected setPageTitle() {
        if (this.currentAction === 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): String {
        return 'novo';
    }

    protected editionPageTitle(): String {
        return 'edição';
    }

    protected createResource() {
        // Criando um Resource nova e atribuindo os valores de resourceForm a constante.
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected updateResource() {
        // Criando um Resource nova e atribuindo os valores de resourceForm a constante.
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected actionsForSuccess(resource: T) {
        toastr.success('Solicitação processada com sucesso!');
        this.submittingForm = false;
        const baseComponentPath: string = this.route.snapshot.parent.routeConfig.path;
        /* this.route.snapshot.url[0].path;
           skipLocationChange: não salvar historico do navegador que passou na pagina
           redirect/reload componen page */
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
        );
    }

    protected actionsForError(error) {
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
