import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { ProductData } from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditGuard } from './product-edit.guard';
import { AuthGuard } from '../route.guard';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    //InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', canActivate:[AuthGuard], component: ProductListComponent },
      { path: 'products/:id', canActivate:[AuthGuard], component: ProductDetailComponent },
      {
        path: 'products/:id/edit',
        canActivate: [AuthGuard],
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
