import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyProfileRoutingModule } from './my-profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MyProfileRoutingModule
    ]
})
export class MyProfileModule { }