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

const myProfileModule = () => import('../my-profile/my-profile.module').then(x => x.MyProfileModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register_user', component: RegisterUserComponent },
            { path: 'register_student', component: RegisterStudentComponent },
            { path: 'forgot_password', component: ForgotPasswordComponent },
            { path: 'reset_password/:resetToken', component: ResetPasswordComponent },
            { path: 'my_profile', loadChildren: myProfileModule, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }