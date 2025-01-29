import { Component, OnInit, Input } from '@angular/core';
import { ReleaseService } from '../release.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../release';
import { Deployment } from '../deployment';

@Component({
  selector: 'app-deployment-list',
  templateUrl: './deployment-list.component.html',
  styleUrls: ['./deployment-list.component.css']
})
export class DeploymentListComponent implements OnInit {
  @Input() releaseName!: string;
  isModalOpen: boolean = false;
  deployments: Deployment[] = [];
  errorMessage: string | undefined;
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

  constructor(
    private releaseService: ReleaseService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.releaseName) {
      this.fetchDeployments(this.releaseName);
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
      case 'PENDING':
        return 'orange';
      case 'STARTED':
        return 'blue';
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
    console.log('View deployment:', deployment);
  }
}