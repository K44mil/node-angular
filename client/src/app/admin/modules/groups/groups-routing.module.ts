import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    AddGroupComponent,
    GroupsListComponent,
    GroupDetailsComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: GroupsListComponent },
            { path: 'add_group', component: AddGroupComponent },
            { path: 'group_details/:id', component: GroupDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }