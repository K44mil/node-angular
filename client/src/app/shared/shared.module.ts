import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent, GroupFinderComponent } from './components';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent,
        GroupFinderComponent
    ],
    exports: [
        AlertComponent,
        GroupFinderComponent
    ]
})
export class SharedModule { }