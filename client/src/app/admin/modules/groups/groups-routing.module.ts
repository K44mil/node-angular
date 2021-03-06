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
    AddCourseComponent,
    EditCourseComponent,
    AddSpecializationComponent,
    EditSpecializationComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    ArchivalCoursesListComponent,
    ArchivalSpecializationsListComponent,
    ArchivalSubjectsListComponent,
    MarkDescriptionsListComponent,
    AddMarkDescriptionComponent,
    EditMarkDescriptionComponent
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
            { path: 'courses/:id/edit', component: EditCourseComponent },
            { path: 'specializations', component: SpecializationsListComponent },
            { path: 'specializations/add_specialization', component: AddSpecializationComponent },
            { path: 'specializations/:id/edit', component: EditSpecializationComponent },
            { path: 'subjects', component: SubjectsListComponent },
            { path: 'subjects/add_subject', component: AddSubjectComponent },
            { path: 'subjects/:id/edit', component: EditSubjectComponent },
            // Archive
            { path: 'archive/courses', component: ArchivalCoursesListComponent },
            { path: 'archive/specializations', component: ArchivalSpecializationsListComponent },
            { path: 'archive/subjects', component: ArchivalSubjectsListComponent },
            // Marks Desc
            { path: 'marks', component: MarkDescriptionsListComponent },
            { path: 'marks/add_mark_desc', component: AddMarkDescriptionComponent },
            { path: 'marks/edit_mark_desc/:id', component: EditMarkDescriptionComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }