import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
    });
  }

  public logout(): void {
    this.accountService.logout();
  }
}
