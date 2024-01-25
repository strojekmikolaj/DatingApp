import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);

  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
          this.setCurrentUser(response);
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem('user');
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }

  public setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}
