import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {EStatus} from '../../../entityModels/rental';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
