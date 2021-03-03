import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupsRoutingModule } from './groups-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
    EditSubjectComponent,
    // Presence
    PresenceDetailsComponent,
    // Mark
    MarkDetailsComponent,
    ArchivalCoursesListComponent,
    ArchivalSpecializationsListComponent,
    ArchivalSubjectsListComponent,
    MarkDescriptionsListComponent,
    AddMarkDescriptionComponent,
    EditMarkDescriptionComponent

} from './components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        GroupsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        // Material
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule
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
        StudentsListComponent,
        PresenceDetailsComponent,
        MarkDetailsComponent,
        ArchivalCoursesListComponent,
        ArchivalSpecializationsListComponent,
        ArchivalSubjectsListComponent,
        MarkDescriptionsListComponent,
        AddMarkDescriptionComponent,
        EditMarkDescriptionComponent
    ]
})
export class GroupsModule { }