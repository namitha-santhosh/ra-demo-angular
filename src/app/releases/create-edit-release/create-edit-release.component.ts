import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Release } from '../release';

@Component({
  selector: 'pm-create-edit-release',
  templateUrl: './create-edit-release.component.html',
  styleUrls: ['./create-edit-release.component.css']
})
export class CreateEditReleaseComponent {
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

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.release);
    this.closeModal();
  }
}
