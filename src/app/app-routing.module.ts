import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonaDetailComponent } from './components/persona-detail/persona-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonaCreateComponent } from './components/persona-create/persona-create.component';

const routes: Routes = [  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'personas', component: PersonasComponent },
  { path: 'detail/:id', component: PersonaDetailComponent },
  { path: 'create', component: PersonaCreateComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}