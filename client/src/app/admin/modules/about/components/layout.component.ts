import { Component } from '@angular/core';

@Component({
    template: `

        <div class="row mt-2">
            <div class="col-md-8">
                <h3>About Pages</h3>
                <hr>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-8 mt-2">
                <router-outlet></router-outlet>
            </div>
            <div class="col-md-4">
                <button class="btn btn-success">Add About Page</button>
            </div>
        </div>
        
        
    `
})
export class LayoutComponent { }