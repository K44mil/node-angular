import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupsRoutingModule } from './groups-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    LayoutComponent,
    AddGroupComponent, 
    GroupsListComponent,
    GroupDetailsComponent,
    GroupAttendanceComponent,
    GroupMarksComponent,
    ArchivalGroupsListComponent,
    EditGroupComponent,
    // Courses
    CoursesListComponent,
    AddCourseComponent,
    // Specializations
    SpecializationsListComponent,
    SubjectsListComponent
    // Subjects
} from './components';

@NgModule({
    imports: [
        CommonModule,
        GroupsRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        AddGroupComponent,
        GroupsListComponent,
        GroupDetailsComponent,
        GroupAttendanceComponent,
        GroupMarksComponent,
        ArchivalGroupsListComponent,
        EditGroupComponent,
        CoursesListComponent,
        SpecializationsListComponent,
        SubjectsListComponent,
        AddCourseComponent
    ]
})
export class GroupsModule { }