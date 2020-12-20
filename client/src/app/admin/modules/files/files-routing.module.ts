import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    FilesListComponent,
    BackupComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: FilesListComponent },
            { path: 'backup', component: BackupComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilesRoutingModule { }