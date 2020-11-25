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
    StudentsListComponent,
    // Courses
    CoursesListComponent,
    AddCourseComponent,
    EditCourseComponent,
    // Specializations
    SpecializationsListComponent,
    AddSpecializationComponent,
    EditSpecializationComponent,
    // Subjects
    SubjectsListComponent,
    AddSubjectComponent,
    EditSubjectComponent

} from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
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
        AddCourseComponent,
        EditCourseComponent,
        AddSpecializationComponent,
        EditSpecializationComponent,
        AddSubjectComponent,
        EditSubjectComponent,
        StudentsListComponent
    ]
})
export class GroupsModule { }