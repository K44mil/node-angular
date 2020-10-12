import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/utils';
import { Role } from '@home/modules/account/models';

const adminModule = () => import('@admin/admin.module').then(x => x.AdminModule);
const homeModule = () => import('@home/home.module').then(x => x.HomeModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: homeModule
  },
  {
    path: 'admin',
    loadChildren: adminModule,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
