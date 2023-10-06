import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AuthService } from './auth.service';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { EditCartComponent } from './edit-cart/edit-cart.component';
import { AuthGuard } from './route.guard';
import { ViewCartComponent } from './viewcart/viewcart.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { CartService } from './products/CartService';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginPageComponent,
    SignupPageComponent, 
    AppNavbarComponent, CategoryComponent, CategoryAddComponent, EditCartComponent, ViewCartComponent, ViewCategoryComponent, AdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component:LoginPageComponent},
      { path: 'signUp', component:SignupPageComponent},
      { path: 'cart', canActivate:[AuthGuard], component:ViewCartComponent},
      { path: 'edit-cart', canActivate:[AuthGuard], component: EditCartComponent},
      { path: 'admin', canActivate:[AuthGuard], component: AdminComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    ProductModule, 
    FormsModule,
    SharedModule
  ],
  providers: [AuthService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

