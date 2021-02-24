import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {RentalService} from '../../services/rental/rental.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category/category.service';
import {TokenStorageService} from '../../services/token/token.service';
import {FormControl} from '@angular/forms';
import {formatISO, parseISO} from 'date-fns';
import {Category} from '../../entityModels/category';
import {UserService} from '../../services/user/user.service';
import {Role} from '../../entityModels/user';
import {AddCategoryDialogComponent} from '../../dialogs/category/add-category-dialog/add-category-dialog.component';
import {EditCategoryDialogComponent} from '../../dialogs/category/edit-category-dialog/edit-category-dialog.component';
import {DeleteCategoryDialogComponent} from '../../dialogs/category/delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  displayedColumns = [ 'category', 'createdAt', 'actions'];
  displayedUserColumns = [ 'username', 'name','email', 'roles', 'createdAt', 'actions'];


  @ViewChild('sort') sort: MatSort;
  @ViewChild('sortUsers') sortUsers: MatSort;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorUsers') paginatorUsers: MatPaginator;

  roles:Role[]=[Role.ADMIN, Role.LESSOR, Role.LESSEE];
  obsUser: Observable<any>;
  dataSourceUser: MatTableDataSource<any>;
  searchFilterUser:any;
  users:any[];
  selectedRole: any;

  obs: Observable<any>;
  dataSourceCategory: MatTableDataSource<any>;
  myItems: any[];
  categories: any[];
  searchFilter: any;

  id: number;
  constructor(private rentalService: RentalService, public dialogService: MatDialog, private router: Router, private categoryService: CategoryService,
             private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private tokenStorage: TokenStorageService) {
    this.id = this.tokenStorage.getUser().id;
    this.selectedRole = new FormControl(this.categories);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.getUsers();
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      console.log(this.categories);
      data.forEach((element: any) => {
        element.createdAt = formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.setPaginationData(this.categories);
    });
  }

  private getUsers(){
    console.log(this.id);
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      data.forEach((element: any) => {
        element.createdAt = formatISO(parseISO(element.createdAt), { representation: 'date' });
      });
      this.users = data;
      this.setPaginationUserData(this.users);
    });
  }

  setPaginationUserData(users: any){
    this.dataSourceUser = new MatTableDataSource<any>(users);
    this.changeDetectorRef.detectChanges();
    this.dataSourceUser.paginator = this.paginatorUsers;
    this.dataSourceUser.sort = this.sortUsers;
    this.obsUser = this.dataSourceUser.connect();
    this.dataSourceUser.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(filter);
      return ( data.roles[0].type.toLowerCase().includes(filter));
    };

  }

  setPaginationData(categories: any){
    this.dataSourceCategory = new MatTableDataSource<any>(categories);
    this.changeDetectorRef.detectChanges();
    this.dataSourceCategory.paginator = this.paginator;
    this.dataSourceCategory.sort = this.sort;
    this.obs = this.dataSourceCategory.connect();
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSourceCategory.filter = filterValue.trim();

    if (this.dataSourceCategory.paginator) {
      this.dataSourceCategory.paginator.firstPage();
    }
  }

  applyFilterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUser.paginator) {
      this.dataSourceUser.paginator.firstPage();
    }
  }

  filterUsersByRole(){
    console.log(this.selectedRole.value);
    this.dataSourceUser.filter = this.selectedRole.value.trim();
    if (this.dataSourceUser.paginator) {
      this.dataSourceUser.paginator.firstPage();
      console.log(this.dataSourceUser.filteredData);
    }
  }

  openAddDialog(){
      let category;
      const dialogRef = this.dialogService.open(AddCategoryDialogComponent, {
        width: '400px',
        data: category
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.categoryService.createCategory(result).subscribe(data => {
            this.router.navigate(['/admin-home']).then(() => {
              window.location.reload();
            });
          });
        }
      });
  }

  openUserAddDialog(){
    let user;
    const dialogRef = this.dialogService.open(AddCategoryDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.categoryService.createCategory(result).subscribe(data => {
          this.router.navigate(['/admin-home']).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  startEdit( id: number, categoryName: any) {
    const dialogRef = this.dialogService.open(EditCategoryDialogComponent, {
      data:  categoryName
    });
    dialogRef.afterClosed().subscribe(result => {

      this.categoryService.updateCategory(result,id).subscribe(data => {
        console.log(data);
        this.router.navigate(['/admin-home']).then(() => {
          window.location.reload();
        });
      });
    });
  }

  deleteItem( category: any) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {
      width: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.categoryService.deleteCategory(category.id).subscribe(data => {
          console.log(data);
          this.router.navigate(['/admin-home']).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
