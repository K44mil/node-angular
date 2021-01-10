import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = '';
  public checked;

  constructor(
    private titleService: Title,
    private authService: AuthService
  ) {
    this.titleService.setTitle('PhD Tomasz Rak - Home Page');
  }

  ngOnInit() {
    this.authService.isLogged()
      .pipe(first())
      .subscribe(
        res => {
          this.checked = true;
        },
        err => {
          this.checked = true;
        }
      )
  }

}
