import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form: FormGroup;
  @Input() userData: User;
  formSubmitted: boolean;
  formMessage: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  submit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userData = this.form.value;
      this.formMessage = 'Formulario guardado correctamente';
    } else {
      this.formMessage = 'Formulario no válido';
    }
  }
}
