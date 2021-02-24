import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {EStatus} from '../../../entityModels/rental';
import {isEqual} from 'date-fns';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss']
})
export class UpdateStatusDialogComponent implements OnInit {

  status:EStatus[]=[EStatus.PICKED,EStatus.RETURNED];

  isOnDate:any;
  statusOrder:EStatus[]=[EStatus.PICKED, EStatus.COMPLETED, EStatus.CANCELLED]
  constructor(public dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.isOnDate= isEqual(new Date(),this.data.item.rentalDate);
    // console.log(this.isOnDate)

  }
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
