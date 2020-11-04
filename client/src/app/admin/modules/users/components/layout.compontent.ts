import { Component } from '@angular/core';

@Component({
    template: `
                  <div class="row mt-3">
                  <div class="col-md-8">
                      <h3>Users</h3>
                      <hr>
                  </div>
              </div>
               <div class="mt-2">
                  <div class="row mb-2 ml-2">
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <a class="nav-link" routerLink="/admin/users">All users</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" routerLink="/admin/users/inactive" >Inactive users</a>
                        
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" routerLink="/admin/blocked_users">Blocked users</a>
                      </li>
                    </ul>
                  </div>

                  <div class="row">
                    <div class="col-8">
                      <router-outlet></router-outlet>
                    </div>
                    <div class="col-4">
                      <!-- <button class="btn btn-success">Add User</button> -->
                    </div>
                  </div>
                </div>            
              `,
})
export class LayoutComponent { }