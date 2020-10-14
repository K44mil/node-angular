import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, AboutPageComponent } from './components';

const accountModule = () => import('@home/modules/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'account', loadChildren: accountModule },
            { path: 'about', component: AboutPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }