import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BackupRoutingModule } from './backup-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BackupRoutingModule
    ],
    declarations: [
        LayoutComponent
    ]
})
export class BackupModule { }