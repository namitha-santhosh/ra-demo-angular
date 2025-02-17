import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar.component';
import { WelcomeComponent } from './home/welcome.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './route.guard';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from './shared/shared.module';
import { ReleaseModule } from './releases/release.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ArtifactsComponent } from './artifact/artifacts/artifacts.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginPageComponent,
    SignupPageComponent, 
    AppNavbarComponent, AdminComponent,
    BreadcrumbComponent,
    ArtifactsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'login', component: LoginPageComponent },
      { path: 'signUp', component: SignupPageComponent },
      { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
      { path: 'artifacts', canActivate: [AuthGuard], component: ArtifactsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ], { useHash: true }),
    ReleaseModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

