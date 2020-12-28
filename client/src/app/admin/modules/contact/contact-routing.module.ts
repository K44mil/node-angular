import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    EditContactComponent,
    EditUniversityInfoComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: EditContactComponent },
            { path: 'university', component: EditUniversityInfoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }