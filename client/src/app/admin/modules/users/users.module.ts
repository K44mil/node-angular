import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import {
    LayoutComponent,
    UsersListComponent,
    InactiveUsersListComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        UsersListComponent,
        InactiveUsersListComponent
    ]
})
export class UsersModule { }