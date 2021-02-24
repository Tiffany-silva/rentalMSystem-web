import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent{

  item:any;
  constructor(public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
