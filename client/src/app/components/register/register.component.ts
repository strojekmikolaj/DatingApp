import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() public cancelRegister = new EventEmitter();

  model: any = {};

  public constructor(
    private readonly accountService: AccountService,
    private readonly toastr: ToastrService
  ) {}

  public register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (errorObj) => this.toastr.error(errorObj.error),
    });
  }

  public cancel() {
    this.cancelRegister.emit(false);
  }
}
