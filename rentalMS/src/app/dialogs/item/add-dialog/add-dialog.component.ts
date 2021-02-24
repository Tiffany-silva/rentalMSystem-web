import {Component, Inject, OnInit} from '@angular/core';
import {Category} from '../../../entityModels/category';
import {CategoryService} from '../../../services/category/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-dialog-component',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>, private categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
 categories: any[];
  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    this.getCategories();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectImage(event: any) {
    this.data.newItem.file = event.target.files;
    console.log(this.data.newItem)
  }


}
