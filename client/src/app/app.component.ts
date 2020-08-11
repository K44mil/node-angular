import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/services';
import { AuthUser } from '@app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  loggedUser: AuthUser;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loggedUser = this.authService.userValue;
  }

}
