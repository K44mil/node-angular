import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';

import { MainNavComponent } from './components';
import { LayoutComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        MainNavComponent
    ]
})
export class HomeModule { }