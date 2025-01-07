// src/app/material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MaterialModule {}
