import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

import {
    ForgotPasswordComponent,
    LayoutComponent,
    LoginComponent,
    MyProfileComponent,
    RegisterStudentComponent,
    RegisterUserComponent,
    ResetPasswordComponent
} from './components';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        MyProfileComponent,
        RegisterUserComponent,
        RegisterStudentComponent
    ]
})
export class AccountModule { }