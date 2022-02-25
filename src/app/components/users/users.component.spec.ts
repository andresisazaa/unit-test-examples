import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { UserComponent } from '../user/user.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: Partial<UserService>;
  usersService = {
    getUsers: () =>
      of<User[]>([
        {
          id: 9,
          email: 'tobias.funke@reqres.in',
          firstname: 'Tobias',
          lastname: 'Funke',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg',
        },
        {
          id: 10,
          email: 'byron.fields@reqres.in',
          firstname: 'Byron',
          lastname: 'Fields',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg',
        },
      ]),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UsersComponent, UserComponent],
        providers: [{ provide: UserService, useValue: usersService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    usersService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia instanciar el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia retornar un Observable', () => {
    const users$ = usersService.getUsers();
    expect(users$).toBeInstanceOf(Observable);
  });

  it('Debería guardarse el usuario seleccionado cuando se emite onSelectUser', () => {
    const button = fixture.debugElement.query(By.css('button.btn-primary'));
    const user: User = {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      firstname: 'Lindsay',
      lastname: 'Ferguson',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg',
    };
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const userComponent: UserComponent = fixture.debugElement.query(
      By.directive(UserComponent)
    ).componentInstance;
    userComponent.onSelectUser.emit(user);
    expect(component.userSelected).toEqual(user);
  });
});
