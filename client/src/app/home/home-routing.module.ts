import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LayoutComponent,
    AboutPageComponent,
    NewsComponent,
    NewsDetailsComponent
} from './components';

const accountModule = () => import('@home/modules/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'account', loadChildren: accountModule },
            { path: 'about', component: AboutPageComponent },
            { path: 'news', component: NewsComponent },
            { path: 'news/:slug', component: NewsDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }