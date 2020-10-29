import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyProfileRoutingModule } from './my-profile-routing.module';

import { HomeModule } from '@home/home.module';

import {
    LayoutComponent,
    GeneralComponent,
    SecurityComponent,
    GroupsComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        MyProfileRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        GeneralComponent,
        SecurityComponent,
        GroupsComponent
    ]
})
export class MyProfileModule { }