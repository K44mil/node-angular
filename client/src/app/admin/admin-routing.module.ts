import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components';

const usersModule = () => import('./modules/users/users.module').then(x => x.UsersModule);
const aboutModule = () => import('./modules/about/about.module').then(x => x.AboutModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'users', loadChildren: usersModule },
            { path: 'about', loadChildren: aboutModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }