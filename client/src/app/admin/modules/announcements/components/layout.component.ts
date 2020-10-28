import { Component } from '@angular/core';

@Component({
    template: `
              <div class="row mt-3">
                <div class="col-md-8">
                    <h3>Announcements</h3>
                    <hr>
                </div>
              </div>
              <router-outlet></router-outlet>         
              `,
})
export class LayoutComponent { }