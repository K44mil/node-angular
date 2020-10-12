import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './components';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    exports: [
        AlertComponent
    ]
})
export class SharedModule { }