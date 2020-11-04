import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, GroupFinderComponent, PaginationComponent } from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AlertComponent,
        GroupFinderComponent,
        PaginationComponent
    ],
    exports: [
        AlertComponent,
        GroupFinderComponent,
        PaginationComponent
    ]
})
export class SharedModule { }