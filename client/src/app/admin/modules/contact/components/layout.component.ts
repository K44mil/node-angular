import { Component } from '@angular/core';

@Component({
    template: `
              <div class="row mt-3">
                <div class="col-md-9">
                    <h3>General</h3>
                    <hr>
                </div>
              </div>
              <router-outlet></router-outlet>                
              `,
})
export class LayoutComponent { }