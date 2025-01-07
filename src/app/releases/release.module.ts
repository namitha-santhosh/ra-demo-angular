import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../route.guard';
import { ReleaseListComponent } from './release-list/release-list.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { CreateEditReleaseComponent } from './create-edit-release/create-edit-release.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'releases', canActivate:[AuthGuard], component: ReleaseListComponent },
      { path: 'releases/:name', canActivate:[AuthGuard], component: ReleaseDetailComponent },
    ]),
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
    ReleaseListComponent,
    ReleaseDetailComponent,
    CreateEditReleaseComponent,
  ]
})
export class ReleaseModule { }
