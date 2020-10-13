import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';

import {
    LayoutComponent,
    UsersListComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        LayoutComponent,
        UsersListComponent
    ]
})
export class UsersModule { }