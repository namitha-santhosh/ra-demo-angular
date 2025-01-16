import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseService } from '../release.service';
import { Release } from '../release';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnInit {
  release!: Release;
  errorMessage: string | undefined;
  isModalOpen: boolean = false;

  constructor(
    private releaseService: ReleaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const releaseName = this.route.snapshot.paramMap.get('name')!;
    if (releaseName) {
      this.getReleaseDetail(releaseName);
    }
  }

  getReleaseDetail(name: string): void {
    this.releaseService.getReleaseByName(name).subscribe({
      next: (release) => {
        this.release = release;
      },
      error: (error) => {
        this.errorMessage = 'Error loading release details';
        console.error(error);
      }
    });
  }

  openEditModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveRelease(updatedRelease: Release): void {
    this.releaseService.updateRelease(updatedRelease).subscribe({
      next: () => {
        this.getReleaseDetail(updatedRelease.name);
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = 'Error updating release';
        console.error(error);
      }
    });
  }

  deleteRelease(): void {
    if (this.release && confirm('Are you sure you want to delete this release?')) {
      this.releaseService.deleteRelease(this.release.name).subscribe({
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
}