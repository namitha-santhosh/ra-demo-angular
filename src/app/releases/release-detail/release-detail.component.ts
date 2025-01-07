import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from '../release.service';
import { Release } from '../release';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnInit {
  release: Release | undefined;
  errorMessage: string | undefined;

  constructor(
    private releaseService: ReleaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const releaseName = this.route.snapshot.paramMap.get('name')!;
    if (releaseName) {
      this.getReleaseDetail(releaseName);
    }
  }

  getReleaseDetail(name: string): void {
    this.releaseService.getReleaseByName(name).subscribe(
      (release) => {
        this.release = release;
      },
      (error) => {
        this.errorMessage = 'Error loading release details';
        console.error(error);
      }
    );
  }
}
