import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupsRoutingModule } from './groups-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
    LayoutComponent,
    AddGroupComponent, 
    GroupsListComponent,
    GroupDetailsComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        GroupsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        AddGroupComponent,
        GroupsListComponent,
        GroupDetailsComponent
    ]
})
export class GroupsModule { }