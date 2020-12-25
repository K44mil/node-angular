import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AboutPagesListComponent,
    AddAboutPageComponent,
    EditAboutPageComponent,
    LayoutComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AboutPagesListComponent },
            { path: 'add_about_page', component: AddAboutPageComponent },
            { path: 'edit_about_page/:id', component: EditAboutPageComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }