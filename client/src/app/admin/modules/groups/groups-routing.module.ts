import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    AddGroupComponent,
    GroupsListComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: GroupsListComponent },
            { path: 'add_group', component: AddGroupComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }