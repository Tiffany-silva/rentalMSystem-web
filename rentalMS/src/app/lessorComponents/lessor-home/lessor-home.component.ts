import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../services/token/token.service';
import {formatISO, parseISO} from 'date-fns';
import {AddDialogComponent} from '../../dialogs/item/add-dialog/add-dialog.component';
import {Item} from '../../entityModels/item';
import {Category} from '../../entityModels/category';
import {CategoryService} from '../../services/category/category.service';
import {EditDialogComponent} from '../../dialogs/item/edit-dialog/edit-dialog.component';
import {DeleteDialogComponent} from '../../dialogs/item/delete-dialog/delete-dialog.component';
import {RentalService} from '../../services/rental/rental.service';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-lessor-home',
  templateUrl: './lessor-home.component.html',
  styleUrls: ['./lessor-home.component.scss']
})
export class LessorHomeComponent implements OnInit {

  displayedColumns = [ 'itemName', 'description', 'category', 'price', 'quantity', 'createdAt', 'actions'];

  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;
  myItems: any[];
  categories: any[];
  searchFilter: any;
  selectedCategory: any;

  id: number;
  constructor(private rentalService: RentalService, public dialogService: MatDialog, private router: Router, private categoryService: CategoryService,
              private dataService: ItemService,private authService:AuthService, private changeDetectorRef: ChangeDetectorRef, private tokenStorage: TokenStorageService) {
    this.id = this.tokenStorage.getUser().id;
    this.selectedCategory = new FormControl(this.categories);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.getItemsOfUser();
    this.getCategories();
  }

  // tslint:disable-next-line:typedef
  private getItemsOfUser(){
    console.log(this.id);
    this.dataService.getAllItemsByUser(this.id).subscribe(data => {
      console.log(data);
      data.forEach((element: any) => {
        element.createdAt = formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.myItems = data;
      this.setPaginationData(this.myItems);
    });
  }

  // tslint:disable-next-line:typedef
  setPaginationData(myItems: any){
    this.dataSource = new MatTableDataSource<any>(myItems);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
    this.dataSource.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(filter);
      return (data.category.categoryName.indexOf(filter) !== -1 ||  data.itemName.toLowerCase().includes(filter));
    };
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
    });
  }

  // tslint:disable-next-line:typedef
  filterItems(){
    console.log(this.selectedCategory.value);
    this.dataSource.filter = this.selectedCategory.value.categoryName.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource.filteredData);
    }
  }

  openAddDialog() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
      const item = new Item();
      // tslint:disable-next-line:prefer-const
      let cId;
      let file;
      console.log(item);
      const newItem = {
        item,
        categories: this.categories,
        categoryId: cId,
        file:file
      };
      const dialogRef = this.dialogService.open(AddDialogComponent, {
        width: '400px',
        data: {newItem}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.newItem.item) {
          this.authService.uploadImageAndGetURL(result.newItem.file).subscribe(url=>{
            result.newItem.item._image=url;
            this.dataService.createItem(this.id, result.newItem.categoryId.id,result.newItem.item).subscribe(data=>{
              this.router.navigate(['/lessor-home']).then(() => {
                window.location.reload();
              });
            })
          })
        }
      });
    });

  }

  startEdit( id: number, item: any) {
    const dialogRef = this.dialogService.open(EditDialogComponent, {
      data:  item
    });
    console.log(item);
    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      console.log(result);
      let r = {
        price: parseFloat(result.price),
        quantity: parseFloat(result.quantity),
        description: result.description,
      };

      console.log(r);
      this.dataService.updateItem(id, result.category.id, r).subscribe(data => {
        console.log(data);
        this.router.navigate(['/lessor-home']).then(() => {
          window.location.reload();
        });
      });
    });
  }

  deleteItem( item: any) {
  console.log(item);
    const dialogRef = this.dialogService.open(DeleteDialogComponent, {
      width: '400px',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteItem(item.id, item.category.id).subscribe(data => {
          console.log(data);
          this.router.navigate(['/lessor-home']).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
