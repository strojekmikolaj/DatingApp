import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private readonly account: AccountService) {}

  public ngOnInit(): void {
    this.setCurrentUser();
  }

  public setCurrentUser() {
    const userString = localStorage.getItem('user');
    userString && this.account.setCurrentUser(JSON.parse(userString));
  }
}
