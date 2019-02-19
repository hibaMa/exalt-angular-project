import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsComponent } from './requests/requests.component';
import { WorkPlanComponent } from './work-plan/work-plan.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import {EnterComponent} from './enter/enter.component';

const routes: Routes = [
  {
    path:'enter',
    component:EnterComponent,
    children:[
      {path:'logIn',component:LogInComponent},
      {path:'register',component:RegisterComponent},
      { path: '', redirectTo: 'logIn', pathMatch: 'full' },
    ]
  },
  {
    path:'main',
    component:MainPageComponent,
    children:[
      {path:'myRequest',component:RequestsComponent},
      {path:'workPlan',component:WorkPlanComponent},
      { path: '', redirectTo: 'myRequest', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/enter/logIn', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
