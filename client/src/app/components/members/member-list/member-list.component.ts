import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  public members$!: Observable<Member[]>;

  public constructor(private membersService: MembersService) {}

  public ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
}
