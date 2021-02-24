import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item/item.service';
import {RentalService} from '../../services/rental/rental.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Status} from 'tslint/lib/runner';
import {TokenStorageService} from '../../services/token/token.service';
import {FormControl, FormGroup} from '@angular/forms';
import {add, differenceInCalendarDays, formatISO9075} from 'date-fns';
import {EStatus, Rental} from '../../entityModels/rental';

@Component({
  selector: 'app-item-detailed',
  templateUrl: './item-detailed.component.html',
  styleUrls: ['./item-detailed.component.scss']
})
export class ItemDetailedComponent implements OnInit {

  id:number;
  minDate: Date;
  maxDate:Date;
  range:FormGroup;
  itemDetails:any;
  totalPrice:any=0.0;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
              private itemService:ItemService, private rentalService:RentalService, private tokenStorage: TokenStorageService,
              private router: Router) {
    this.id = parseFloat(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getDetails();

    this.minDate = new Date();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });


  }

  ngOnInit(): void {
    this.getDetails();
  }


  setMaxDate(){
    if(this.range.controls.start.value){
      this.maxDate=add(this.range.controls.start.value, {days: 14});
    }
    return this.maxDate;
  }
  getDetails(){

    this.itemService.getItem(this.id).subscribe(data=>{
      this.itemDetails=data;
      console.log(this.itemDetails);
    })
  }

  getVehicleAvailability(start:any, end:any){
    let s=add(start,{hours: 13, minutes:30});
    let e=add(end,{hours: 13, minutes:30});
    let ss=formatISO9075(start);
    let ee=formatISO9075(end);

    console.log(ss);
    console.log(ee);
    let req={rentalDate: start, returnDate:end, id:this.id}

    this.rentalService.checkAvailability(this.id, req).subscribe(data=>{

      this.itemDetails=data;
      console.log(this.itemDetails)
    })
    this.calculatePrice(start, end, this.itemDetails.price);
    console.log(this.totalPrice);

  }

  calculatePrice (bookedDate:any, returnDate:any, itemCost:any){
    let totalDays=differenceInCalendarDays(returnDate, bookedDate);
    this.totalPrice= totalDays * itemCost;
  }

  createRental(start:any, end:any){

    let rental:Rental=new Rental();
    let id=this.tokenStorage.getUser().id;

        rental._itemId=this.id;
        rental._rentalDate=start;
        rental._userId=id
        rental._returnDate=end;
        rental._status=EStatus.BOOKED;
        rental._totalPrice=this.totalPrice;

        console.log(rental);
        this.rentalService.createRental(rental, this.id, id).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/home']);
        }, err => {
          this.errorMessage = err.error.message;
        })

  }

}
