import { Component, OnInit, Input } from '@angular/core';
import { ReleaseService } from '../release.service';
import { DeploymentService } from '../deployment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../release';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deployment-list.component.html',
  styleUrls: ['./deployment-list.component.css']
})
export class DeploymentListComponent {
  @Input() releaseName: string | undefined;
  isModalOpen: boolean = false;
  deployments: any[] = [];
  errorMessage: string | undefined;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private releaseService: ReleaseService, 
    private deploymentService: DeploymentService,    
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.releaseName) {
      this.fetchDeployments(this.releaseName);
    }
  }

  fetchDeployments(releaseName: string): void {
    this.releaseService.getReleaseDeployments(releaseName).subscribe(
      (deployments) => {
        this.deployments = deployments;
      },
      (error) => {
        this.errorMessage = 'Error fetching artifacts';
        console.error(error);
      }
    );
  }

  deleteDeployment(slug:string): void {
    if (slug && confirm('Are you sure you want to delete this deployment?')) {
      this.deploymentService.deleteDeployment(slug).subscribe({
        next: () => {
          this.router.navigate(['/releases']);
        },
        error: (error) => {
          this.errorMessage = 'Error deleting release';
          console.error(error);
        }
      });
    }
  }

  openModal(): void {
      this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }
  
  saveDeployment(release: Release): void {
    console.log('saving depl');
  }
  
}
