import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Release } from '../release';

@Component({
  selector: 'pm-create-edit-release',
  templateUrl: './create-edit-release.component.html',
  styleUrls: ['./create-edit-release.component.css'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class CreateEditReleaseComponent implements OnInit {
  // Add form model properties to handle date strings
  dateModel = {
    productionDate: '',
    qaDate: '',
    stageDate: ''
  };

  @Input() release: Release = {
    name: '',
    status: '',
    productionDate: new Date(),
    qaDate: new Date(),
    stageDate: new Date(),
    mainReleaseTicket: ''
  };

  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Release>();

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    // Initialize date model with formatted dates when component loads
    if (this.release) {
      this.initializeDates();
    }
  }

  initializeDates() {
    // Convert dates to the format expected by mat-datepicker (yyyy-MM-dd)
    this.dateModel = {
      productionDate: this.formatDateForInput(this.release.productionDate),
      qaDate: this.formatDateForInput(this.release.qaDate),
      stageDate: this.formatDateForInput(this.release.stageDate)
    };
  }

  formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return this.datePipe.transform(dateObj, 'yyyy-MM-dd') || '';
  }

  onDateChange(event: any, dateField: 'productionDate' | 'qaDate' | 'stageDate') {
    // Update the release object with the new Date object
    if (event.value) {
      this.release[dateField] = new Date(event.value);
    }
  }

  prepareReleaseForSubmission(): Release {
    // Create a copy of the release object with properly formatted dates
    const preparedRelease: Release = {
      ...this.release,
      productionDate: new Date(this.dateModel.productionDate),
      qaDate: new Date(this.dateModel.qaDate),
      stageDate: new Date(this.dateModel.stageDate)
    };

    // Ensure timezone is properly handled
    preparedRelease.productionDate.setMinutes(
      preparedRelease.productionDate.getMinutes() - preparedRelease.productionDate.getTimezoneOffset()
    );
    preparedRelease.qaDate.setMinutes(
      preparedRelease.qaDate.getMinutes() - preparedRelease.qaDate.getTimezoneOffset()
    );
    preparedRelease.stageDate.setMinutes(
      preparedRelease.stageDate.getMinutes() - preparedRelease.stageDate.getTimezoneOffset()
    );

    return preparedRelease;
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    const preparedRelease = this.prepareReleaseForSubmission();
    this.save.emit(preparedRelease);
    this.closeModal();
  }
}