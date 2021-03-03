import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';
import { ClipboardModule } from 'ngx-clipboard';

import {
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
        ReactiveFormsModule,
        ClipboardModule
    ],
    declarations: [
        LayoutComponent,
        FilesListComponent
    ]
})
export class FilesModule { }