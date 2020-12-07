import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';

import {
    FilesListComponent,
    LayoutComponent
} from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FilesRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        FilesListComponent
    ]
})
export class FilesModule { }