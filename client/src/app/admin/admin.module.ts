import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { LayoutComponent } from './components/layout.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminNavComponent,
        LayoutComponent
    ]
})
export class AdminModule { }