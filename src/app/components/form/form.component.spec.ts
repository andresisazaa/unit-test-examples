import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormComponent],
        imports: [ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia instanciarse', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia ser invalido cuando el formulario esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('Validaciones campo firstname', () => {
    const firstnameControl = component.firstname;
    expect(firstnameControl.valid).toBeFalse();

    firstnameControl.setValue('');
    expect(firstnameControl.hasError('required')).toBeTrue();

    firstnameControl.setValue('J');
    expect(firstnameControl.hasError('minlength')).toEqual(true);

    firstnameControl.setValue('John');
    expect(firstnameControl.valid).toBe(true);
  });

  it('Validaciones campo lastname', () => {
    const lastnameControl = component.lastname;
    expect(lastnameControl.valid).toBeFalse();

    lastnameControl.setValue('');
    expect(lastnameControl.hasError('required')).toBeTrue();

    lastnameControl.setValue('D');
    expect(lastnameControl.hasError('minlength')).toEqual(true);

    lastnameControl.setValue('Doe');
    expect(lastnameControl.valid).toBe(true);
  });

  it('Validaciones campo email', () => {
    const emailControl = component.email;
    expect(emailControl.valid).toBeFalse();

    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();

    emailControl.setValue('john@');
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('john@example');
    expect(emailControl.hasError('email')).toBeFalse();

    expect(emailControl.valid).toBe(true);
  });

  it('Deberia guardar el nombre en el formulario cuando se escribe en el input', () => {
    const name = 'John';
    const inputElement = fixture.debugElement.query(By.css('#nombre'))
      .nativeElement as HTMLInputElement;
    inputElement.value = name;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.firstname.value).toEqual(name);
  });

  it('Deberia guardar el apellido en el formulario cuando se escribe en el input', () => {
    const name = 'Doe';
    const inputElement = fixture.debugElement.query(By.css('#apellido'))
      .nativeElement as HTMLInputElement;
    inputElement.value = name;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lastname.value).toEqual(name);
  });

  it('Deberia guardar el email en el formulario cuando se escribe en el input', () => {
    const name = 'john@example';
    const inputElement = fixture.debugElement.query(By.css('#email'))
      .nativeElement as HTMLInputElement;
    inputElement.value = name;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.email.value).toEqual(name);
  });

  it('Deberia llamarse el submit cuando se da click en el button submit', () => {
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    const submitSpy = spyOn(component, 'submit');
    button.nativeElement.click();
    fixture.detectChanges();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('Deberia guardar los datos del formulario en userData', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
    const firstnameElement = fixture.debugElement.query(By.css('#nombre'))
      .nativeElement as HTMLInputElement;
    const lastnameElement = fixture.debugElement.query(By.css('#apellido'))
      .nativeElement as HTMLInputElement;
    const emailElement = fixture.debugElement.query(By.css('#email'))
      .nativeElement as HTMLInputElement;
    firstnameElement.value = user.firstname;
    lastnameElement.value = user.lastname;
    emailElement.value = user.email;
    firstnameElement.dispatchEvent(new Event('input'));
    lastnameElement.dispatchEvent(new Event('input'));
    emailElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.submit();
    expect(component.formSubmitted).toEqual(true);
    expect(component.form.valid).toEqual(true);
    expect(component.userData).toEqual(user);
    expect(component.formMessage).toEqual('Formulario guardado correctamente');
  });

  it('Deberia indicar que el formulario no es válido', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@',
    };
    component.firstname.setValue(user.firstname);
    component.lastname.setValue(user.lastname);
    component.email.setValue(user.email);
    component.submit();
    expect(component.formSubmitted).toEqual(true);
    expect(component.form.invalid).toEqual(true);
    expect(component.formMessage).toEqual('Formulario no válido');
  });

  it('Deberia renderizar el mensaje cuando el formularo es válido', () => {
    const compiled = fixture.debugElement.query(By.css('p#form-message'));
    const message: HTMLParagraphElement = compiled.nativeElement;
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
    component.firstname.setValue(user.firstname);
    component.lastname.setValue(user.lastname);
    component.email.setValue(user.email);
    component.submit();
    fixture.detectChanges();
    expect(message.textContent).toContain('Formulario guardado correctamente');
  });

  it('Deberia renderizar el mensaje cuando el formularo NO es válido', () => {
    const compiled = fixture.debugElement.query(By.css('p#form-message'));
    const message: HTMLParagraphElement = compiled.nativeElement;
    component.submit();
    fixture.detectChanges();
    expect(message.textContent).toContain('Formulario no válido');
  });
});
