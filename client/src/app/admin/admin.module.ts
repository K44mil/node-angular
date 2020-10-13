import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '@shared/shared.module';

import {
    LayoutComponent,
    AdminNavComponent,
    AdminSideNavComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [
        AdminNavComponent,
        LayoutComponent,
        AdminSideNavComponent
    ]
})
export class AdminModule { }