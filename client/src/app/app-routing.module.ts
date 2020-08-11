import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const accountModule = () => import('./modules/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
