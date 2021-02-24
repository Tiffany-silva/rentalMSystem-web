import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {EStatus} from '../../entityModels/rental';
import {RentalService} from '../../services/rental/rental.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CategoryService} from '../../services/category/category.service';
import {ItemService} from '../../services/item/item.service';
import {TokenStorageService} from '../../services/token/token.service';
import {FormControl} from '@angular/forms';
import {formatISO, parseISO} from 'date-fns';
import {UpdateStatusDialogComponent} from '../../dialogs/rental/update-status-dialog/update-status-dialog.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = [ 'itemName', 'category','rentalDate', 'returnDate', 'totalPrice', 'lessee', 'contact', 'status','createdAt', 'actions'];

  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;
  myOrders: any[];
  status: EStatus[]=[EStatus.PICKED,EStatus.COMPLETED];
  searchFilter: any;
  selectedStatus: any;

  id: number;
  constructor(private rentalService: RentalService, public dialogService: MatDialog, private router: Router, private categoryService: CategoryService,
              private dataService: ItemService, private changeDetectorRef: ChangeDetectorRef, private tokenStorage: TokenStorageService) {
    this.id = this.tokenStorage.getUser().id;
    this.selectedStatus = new FormControl(this.status);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.getOrdersOfUser();
  }

  // tslint:disable-next-line:typedef
  private getOrdersOfUser(){
    console.log(this.id);
    this.rentalService.getMyOrders(this.id).subscribe(data => {
      console.log(data);
      data.forEach((element: any) => {
        element.createdAt = formatISO(parseISO(element.createdAt), { representation: 'date' });
        element.returnDate = formatISO(parseISO(element.returnDate), { representation: 'date' });
        element.rentalDate = formatISO(parseISO(element.rentalDate), { representation: 'date' });
      });
      this.myOrders = data;
      this.setPaginationData(this.myOrders);
    });
  }

  // tslint:disable-next-line:typedef
  setPaginationData(myOrders: any){
    this.dataSource = new MatTableDataSource<any>(myOrders);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
    this.dataSource.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(filter);
      return (data.status.indexOf(filter) !== -1 ||  data.item.itemName.toLowerCase().includes(filter));
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

  filterItems(){
    console.log(this.selectedStatus.value);
    this.dataSource.filter = this.selectedStatus.value.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource.filteredData);
    }
  }

  startEdit( id: number, item: any) {
    const dialogRef = this.dialogService.open(UpdateStatusDialogComponent, {
      data: { item: item, type:'order'}
    });
    console.log(item);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.status);
      let estatus=EStatus[result.item.status];
      this.rentalService.updateRentalStatus(this.id,item.id, estatus).subscribe(data => {
        console.log(data);
        this.router.navigate(['/lessor-orders']).then(() => {
          window.location.reload();
        });
      });
    });
  }

}
