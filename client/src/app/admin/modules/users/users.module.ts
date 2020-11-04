import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import { JwPaginationModule } from 'jw-angular-pagination';

import {
    LayoutComponent,
    UsersListComponent,
    InactiveUsersListComponent
} from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        JwPaginationModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        UsersListComponent,
        InactiveUsersListComponent
    ]
})
export class UsersModule { }