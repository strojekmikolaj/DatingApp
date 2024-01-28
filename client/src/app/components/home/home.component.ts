import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public registerMode = false;
  public users: any;

  public constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (errorObj) => this.toastr.error(errorObj.error),
      complete: () => console.log('Request completed'),
    });
  }

  public registerToggle() {
    this.registerMode = !this.registerMode;
  }

  public cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
