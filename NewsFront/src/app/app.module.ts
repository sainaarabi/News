import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryDetailComponent } from './inventory-details/inventory-detail/inventory-detail.component';
import { NewsListComponent } from './inventory-details/news-list/news-list.component';
import { HomeComponent } from './inventory-details/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './inventory-details/admin/admin.component';
import { HomeListComponent } from './inventory-details/home-list/home-list.component';
import { NewsShowComponent } from './inventory-details/news-show/news-show.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './inventory-details/header/header.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientInterceptor } from './interceptors/http.interceptor';
import { InventoryDetailService } from './shared/inventory-detail.service';

export function getToken(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    InventoryDetailsComponent,
    InventoryDetailComponent,
    NewsListComponent,
    HomeComponent,
    AdminComponent,
    HomeListComponent,
    NewsShowComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    AuthService,
    JwtHelperService,
    InventoryDetailService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
