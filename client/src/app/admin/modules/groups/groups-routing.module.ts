import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    AddGroupComponent,
    GroupsListComponent,
    GroupDetailsComponent,
    GroupAttendanceComponent,
    ArchivalGroupsListComponent,
    GroupMarksComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: GroupsListComponent },
            { path: 'archival', component: ArchivalGroupsListComponent },
            { path: 'add_group', component: AddGroupComponent },
            { path: ':id/general', component: GroupDetailsComponent },
            { path: ':id/attendance', component: GroupAttendanceComponent },
            { path: ':id/marks', component: GroupMarksComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }