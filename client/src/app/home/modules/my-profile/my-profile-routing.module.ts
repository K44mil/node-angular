import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/utils';
import { Role } from '@home/modules/account/models';

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
            { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard], data: { roles: [Role.Student] } },
            { path: 'find_group', component: FindGroupComponent, canActivate: [AuthGuard], data: { roles: [Role.Student] } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyProfileRoutingModule { }