import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    UsersListComponent,
    InactiveUsersListComponent,
    BlockedUsersListComponent,
    AddUserComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: UsersListComponent },
            { path: 'inactive', component: InactiveUsersListComponent },
            { path: 'blocked', component: BlockedUsersListComponent },
            { path: 'add_user', component: AddUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
