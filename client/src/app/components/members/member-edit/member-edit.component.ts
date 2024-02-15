import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') public editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) public unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  public member!: Member;
  public user!: User | null;

  public constructor(
    private readonly accountService: AccountService,
    private readonly memberService: MembersService,
    private readonly toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe({ next: (user) => (this.user = user) });

    this.loadMember();
  }

  public loadMember() {
    if (!this.user) return;
    this.memberService
      .getMember(this.user.username)
      .subscribe({ next: (member) => (this.member = member) });
  }

  public updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile update successfuly');
        this.editForm.reset(this.member);
      },
    });
  }
}
