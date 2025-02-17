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
import { ArtifactListComponent } from './artifact-list/artifact-list.component';
import { DeploymentListComponent } from './deployment-list/deployment-list.component';
import { CreateDeploymentModalComponent } from './create-deployment-modal/create-deployment-modal.component';
import { ReleaseGoNoGoComponent } from './release-go-no-go/release-go-no-go.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'releases', canActivate:[AuthGuard], component: ReleaseListComponent,  data: { breadcrumb: 'Releases' } },
      { path: 'releases/:name', canActivate:[AuthGuard], component: ReleaseDetailComponent,  data: { breadcrumb: 'Detail' } },
    ]),
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
    ReleaseListComponent,
    ReleaseDetailComponent,
    CreateEditReleaseComponent,
    ArtifactListComponent,
    DeploymentListComponent,
    CreateDeploymentModalComponent,
    ReleaseGoNoGoComponent
  ]
})
export class ReleaseModule { }
