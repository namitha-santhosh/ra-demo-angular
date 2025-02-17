import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ReleaseService } from '../release.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../release';
import { Deployment } from '../deployment';
import { interval, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deployment-list.component.html',
  styleUrls: ['./deployment-list.component.css']
})
export class DeploymentListComponent implements OnInit, OnDestroy {
  @Input() releaseName!: string;
  isModalOpen: boolean = false;
  deployments: Deployment[] = [];
  errorMessage: string | undefined;
  isDetailsModalOpen: boolean = false;
  selectedDeployment: Deployment | null = null;
  displayedColumns: string[] = [
    'buildNumber',
    'jobName',
    'environment',
    'status',
    'triggeredBy',
    'createdAt',
    'actions'
  ];
  isLoading: boolean = false;
  private refreshSubscription!: Subscription;

  constructor(
    private releaseService: ReleaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.releaseName) {
      this.fetchDeployments(this.releaseName);

      // Set up periodic polling every 20 seconds
      this.refreshSubscription = interval(20000).subscribe(() => {
        this.fetchDeployments(this.releaseName);
      });
    }
  }

  fetchDeployments(releaseName: string): void {
    this.isLoading = true;
    this.releaseService.getReleaseDeployments(releaseName).subscribe({
      next: (response) => {
        this.deployments = response.deployments;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching deployments';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getEnvironment(deployment: Deployment): string {
    return deployment.parameters?.deployEnv || 'N/A';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  getStatusColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'green';
      case 'FAILED':
        return 'red';
      case 'IN-PROGRESS':
        return 'orange';
      case 'ABORTED':
        return 'blue';
      case 'UNSTABLE':
        return 'yellow';
      default:
        return 'grey';
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveDeployment(release: Release): void {
    this.closeModal();
    this.fetchDeployments(this.releaseName!);
  }

  viewDeploymentDetails(deployment: Deployment): void {
    this.selectedDeployment = deployment;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedDeployment = null;
  }
}
