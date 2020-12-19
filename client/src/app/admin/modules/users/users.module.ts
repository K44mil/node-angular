import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import { JwPaginationModule } from 'jw-angular-pagination';

import {
    LayoutComponent,
    UsersListComponent,
    InactiveUsersListComponent,
    BlockedUsersListComponent,
    AdminGroupFinderComponent,
    AddUserComponent,
    EditUserComponent
} from './components';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        JwPaginationModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        UsersListComponent,
        InactiveUsersListComponent,
        BlockedUsersListComponent,
        AdminGroupFinderComponent,
        AddUserComponent,
        EditUserComponent
    ],
    exports: [
        AdminGroupFinderComponent
    ]
})
export class UsersModule { }