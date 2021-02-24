import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../services/token/token.service';
import {ItemService} from '../../services/item/item.service';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../entityModels/category';

@Component({
  selector: 'app-lessee-home',
  templateUrl: './lessee-home.component.html',
  styleUrls: ['./lessee-home.component.scss']
})
export class LesseeHomeComponent implements OnInit {

  selectedCategory: any;
  categories: any[] = [];
  itemList: any [] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef,
              private tokenService: TokenStorageService, private itemService: ItemService, private categoryService: CategoryService) {
    console.log(this.categories);
    console.log(this.itemList);
    this.selectedCategory = new FormControl(this.categories);

  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  filterItems(){
    console.log(this.selectedCategory.value);
    this.dataSource.filter = this.selectedCategory.value.categoryName;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource.filteredData);

    }

  }

  getAllItems(){
    this.itemService.getAllItems().subscribe(data => {
      this.itemList = data;
      this.setPaginationData(this.itemList);
    });
    console.log(this.itemList);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.getAllItems();
    this.getCategories();
  }

  // tslint:disable-next-line:typedef
  setPaginationData(items: any){
    this.dataSource = new MatTableDataSource<any>(items);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.dataSource.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(filter);
      return (data.category.categoryName.indexOf(filter) !== -1 ||  data.itemName.toLowerCase().includes(filter));
    };
  }

  // tslint:disable-next-line:typedef
  getCategories(){
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      this.categories.unshift(new Category());
      console.log(this.categories);
    });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
