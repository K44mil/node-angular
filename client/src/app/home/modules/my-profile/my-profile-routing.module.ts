import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    GeneralComponent,
    SecurityComponent,
    GroupsComponent,
    FindGroupComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'general', component: GeneralComponent },
            { path: 'security', component: SecurityComponent },
            { path: 'groups', component: GroupsComponent },
            { path: 'find_group', component: FindGroupComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyProfileRoutingModule { }