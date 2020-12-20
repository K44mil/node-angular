import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';

import {
    BackupComponent,
    FilesListComponent,
    LayoutComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FilesRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        FilesListComponent,
        BackupComponent
    ]
})
export class FilesModule { }