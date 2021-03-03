import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AnnouncementsRoutingModule } from './announcements-routing.module';

import {
    AddAnnouncementComponent,
    AnnouncementsListComponent,
    LayoutComponent,
    EditAnnouncementComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        AnnouncementsRoutingModule,
        ReactiveFormsModule,
        JwPaginationModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule
    ],
    declarations: [
        LayoutComponent,
        AnnouncementsListComponent,
        AddAnnouncementComponent,
        EditAnnouncementComponent
    ]
})
export class AnnouncementsModule { }