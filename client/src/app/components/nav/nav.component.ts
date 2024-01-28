import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  public model: any = {};

  public constructor(
    public readonly accountService: AccountService,
    private readonly toastr: ToastrService
  ) {}

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (errorObj) => this.toastr.error(errorObj.error),
    });
  }

  public logout(): void {
    this.accountService.logout();
  }
}
