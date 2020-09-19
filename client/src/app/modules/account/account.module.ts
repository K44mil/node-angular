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
    RegisterComponent,
    ResetPasswordComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        MyProfileComponent,
        RegisterUserComponent,
        RegisterStudentComponent
    ]
})
export class AccountModule { }