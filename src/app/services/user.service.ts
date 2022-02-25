import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { GetUsersDTO, UserDTO } from '../models/get-users-dto.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly URL = 'https://reqres.in/api';
  constructor(private http: HttpClient) {}
  getUsers(page: number = 1): Observable<User[]> {
    return this.http.get<GetUsersDTO>(`${this.URL}/users?page=${page}`).pipe(
      map((response: GetUsersDTO) => {
        const users: User[] = response.data.map((userDto: UserDTO) => ({
          id: userDto.id,
          email: userDto.email,
          firstname: userDto.first_name,
          lastname: userDto.last_name,
          avatar: userDto.avatar,
        }));
        return users;
      })
    );
  }
}
