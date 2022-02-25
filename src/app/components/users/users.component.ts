import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersFromService: User[];
  usersFromStore: User[];
  userSelected: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUserSelected(user: User): void {
    this.userSelected = user;
  }

  getUsers(): Subscription {
    return this.userService
      .getUsers()
      .subscribe((users: User[]) => (this.usersFromService = users));
  }

  get isSelected(): boolean {
    return !!this.userSelected;
  }
}
