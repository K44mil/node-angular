import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AddAnnouncementComponent,
    AnnouncementsListComponent,
    LayoutComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: AnnouncementsListComponent },
            { path: 'add_announcement', component: AddAnnouncementComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }