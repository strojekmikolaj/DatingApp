import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent {
  public baseUrl = 'https://localhost:5001/api/';
  public validationErrors: string[] = [];

  public constructor(private readonly http: HttpClient) {}

  public get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  public get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  public get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  public get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }

  public get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error), (this.validationErrors = error);
      },
    });
  }
}
