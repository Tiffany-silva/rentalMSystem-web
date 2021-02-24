export enum EStatus {
  CANCELLED = 'CANCELLED',
  BOOKED = 'BOOKED',
  EXTENDED = 'EXTENDED',
  PICKED = 'PICKED',
  RETURNED = 'RETURNED',
  COMPLETED = 'COMPLETED'
}
export class Rental {

  private id: number;

  private rentalDate: Date;

  private returnDate: Date;

  private totalPrice: number;

  private status: EStatus;

  private userId: number;

  private itemId: number;
  constructor(){
  }

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _rentalDate(): Date {
    return this.rentalDate;
  }

  set _rentalDate(value: Date) {
    this.rentalDate = value;
  }
  get _returnDate(): Date {
    return this.returnDate;
  }

  set _returnDate(value: Date) {
    this.returnDate = value;
  }
  get _totalPrice(): number {
    return this.totalPrice;
  }

  set _totalPrice(value: number) {
    this.totalPrice = value;
  }
  get _status(): EStatus {
    return this.status;
  }

  set _status(value: EStatus) {
    this.status = value;
  }

  get _userId(): number {
    return this.userId;
  }

  set _userId(value: number) {
    this.userId = value;
  }

  get _itemId(): number {
    return this.itemId;
  }

  set _itemId(value: number) {
    this.itemId = value;
  }



}
