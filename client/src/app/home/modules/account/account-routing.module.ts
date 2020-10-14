import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    ForgotPasswordComponent,
    LayoutComponent,
    LoginComponent,
    MyProfileComponent,
    RegisterStudentComponent,
    RegisterUserComponent,
    ResetPasswordComponent
} from './components';

import { AuthGuard } from '@app/utils';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register_user', component: RegisterUserComponent },
            { path: 'register_student', component: RegisterStudentComponent },
            { path: 'forgot_password', component: ForgotPasswordComponent },
            { path: 'reset_password/:resetToken', component: ResetPasswordComponent },
            { path: 'my_profile', component: MyProfileComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }