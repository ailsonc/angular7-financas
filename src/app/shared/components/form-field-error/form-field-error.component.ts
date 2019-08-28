import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
  <div class="text-danger">
    {{errorMessage}}
  </div>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.mustShowerrorMessage()) {
      return this.message();
    } else {
      return null;
    }
  }

  private mustShowerrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private message(): string | null {
    if (this.formControl.errors.required) {
      return "*Obrigatório";
    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }
  }

}
