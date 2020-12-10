import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyProfileRoutingModule } from './my-profile-routing.module';

import { HomeModule } from '@home/home.module';

import {
    LayoutComponent,
    GeneralComponent,
    SecurityComponent,
    GroupsComponent,
    FindGroupComponent
} from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        HomeModule,
        MyProfileRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        GeneralComponent,
        SecurityComponent,
        GroupsComponent,
        FindGroupComponent
    ]
})
export class MyProfileModule { }