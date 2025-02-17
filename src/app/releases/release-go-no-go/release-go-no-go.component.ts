import { Component, OnInit, Input } from '@angular/core';
import { ReleaseService } from '../release.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-release-go-no-go',
  templateUrl: './release-go-no-go.component.html',
  styleUrls: ['./release-go-no-go.component.css']
})
export class ReleaseGoNoGoComponent implements OnInit {
  @Input() releaseName!: string;

  signoffTypes: string[] = [
    'QA Signoff',
    'UAT Signoff',
    'STG Signoff',
    'Rollback Test',
    'Infosec Signoff',
    'Operations Handoff',
    'CAB Approval',
  ];
  
  signoffs: any[] = [];
  userRoles: string[] = [];

  constructor(
    private releaseService: ReleaseService, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.fetchSignoffs();
  }

  fetchSignoffs() {
    this.releaseService.getSignoffs(this.releaseName).subscribe(
      (data) => {
        this.signoffs = data;
      },
      (error) => {
        console.error('Error loading signoffs:', error);
      }
    );
  }

  getSignoffField(type: string, field: string) {
    const signoff = this.signoffs.find((s) => s.type === type);
    return signoff ? signoff[field] : null;
  }

  getSignoffStatus(type: string) {
    return this.signoffs.find((s) => s.type === type)?.status ? 'yes' : 'no';
  }

  handleSignoff(type: string, status: boolean) {
    const userEmail = this.authService.getUser() ?? 'test';
    
    const signoffData = {
      type: type,
      signedOffBy: userEmail,
      status: status,
    };

    this.createOrUpdateSignoff(signoffData);
  }

  createOrUpdateSignoff(signoffData: any) {
    this.releaseService.createOrUpdateSignoff(this.releaseName, signoffData).subscribe(
      () => {
        this.fetchSignoffs();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/releases', this.releaseName]);
        });
      },
      (error) => {
        console.error('Error updating signoff:', error);
      }
    );
  }

  isSignoffDisabled(type: string): boolean {
    if (this.getSignoffStatus(type) === 'yes') {
      return true;
    }
  
    const isQA = this.authService.hasRole('ROLE_QA');
    const isRA = this.authService.hasRole('ROLE_RA');
  
    if (type === 'QA Signoff') {
      return !isQA && !isRA;
    }
  
    if (type === 'UAT Signoff') {
      return !isRA;
    }
  
    const isQAApproved = this.getSignoffStatus('QA Signoff') === 'yes';
    const isUATApproved = this.getSignoffStatus('UAT Signoff') === 'yes';
  
    return !(isQAApproved && isUATApproved);
  }  
}
