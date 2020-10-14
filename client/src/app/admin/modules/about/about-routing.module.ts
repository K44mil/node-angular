import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AboutPagesListComponent,
    LayoutComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AboutPagesListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }