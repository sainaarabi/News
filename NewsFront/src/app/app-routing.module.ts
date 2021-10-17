import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './inventory-details/home/home.component';
import { AdminComponent } from './inventory-details/admin/admin.component';
import { NewsShowComponent } from './inventory-details/news-show/news-show.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['1']
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['1', '2']
    }
  },
  {
    path: 'posts/:id',
    component: NewsShowComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['1', '2']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }