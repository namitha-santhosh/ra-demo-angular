import { Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav>
      <ol class="breadcrumb">
        <li *ngFor="let breadcrumb of breadcrumbService.breadcrumbs">
          <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      background-color: transparent;
      padding: 0;
      margin: 0;
    }
  `]
})
export class BreadcrumbComponent {
  constructor(public breadcrumbService: BreadcrumbService) {}
}
