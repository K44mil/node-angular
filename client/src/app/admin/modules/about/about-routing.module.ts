import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AboutPagesListComponent,
    AddAboutPageComponent,
    LayoutComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AboutPagesListComponent },
            { path: 'add_about_page', component: AddAboutPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }