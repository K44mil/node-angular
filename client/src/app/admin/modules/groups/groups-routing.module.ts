import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    AddGroupComponent,
    GroupsListComponent,
    GroupDetailsComponent,
    GroupAttendanceComponent,
    ArchivalGroupsListComponent,
    GroupMarksComponent,
    EditGroupComponent,
    CoursesListComponent,
    SpecializationsListComponent,
    SubjectsListComponent,
    AddCourseComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: GroupsListComponent },
            { path: 'archival', component: ArchivalGroupsListComponent },
            { path: 'add_group', component: AddGroupComponent },
            { path: ':id/edit', component: EditGroupComponent},
            { path: ':id/general', component: GroupDetailsComponent },
            { path: ':id/attendance', component: GroupAttendanceComponent },
            { path: ':id/marks', component: GroupMarksComponent },
            { path: 'courses', component: CoursesListComponent },
            { path: 'courses/add_course', component: AddCourseComponent },
            { path: 'specializations', component: SpecializationsListComponent },
            { path: 'subjects', component: SubjectsListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }