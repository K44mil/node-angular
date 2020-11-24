import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    AlertComponent,
    GroupFinderComponent,
    PaginationComponent,
    ModalComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AlertComponent,
        GroupFinderComponent,
        PaginationComponent,
        ModalComponent
    ],
    exports: [
        AlertComponent,
        GroupFinderComponent,
        PaginationComponent,
        ModalComponent
    ]
})
export class SharedModule { }