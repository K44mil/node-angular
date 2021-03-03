import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
    LayoutComponent,
    AboutPageComponent,
    NewsComponent,
    NewsDetailsComponent,
    ContactPageComponent,
    ResearchPageComponent,
    HomePageComponent,
    CalendarPageComponent
} from './components';

const accountModule = () => import('@home/modules/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomePageComponent },
            { path: 'account', loadChildren: accountModule },
            { path: 'about', component: AboutPageComponent },
            { path: 'news', component: NewsComponent },
            { path: 'news/:slug', component: NewsDetailsComponent },
            { path: 'contact', component: ContactPageComponent },
            { path: 'research', component: ResearchPageComponent },
            { path: 'calendar', component: CalendarPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }