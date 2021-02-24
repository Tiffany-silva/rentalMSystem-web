
export class Item {

  private id: number;

  private itemName: string;

  private description: string;

  private quantity: number;

  private price: number;

  private userId: number;

  private categoryId: number;

  private image:String;


  get _image(): String {
    return this.image;
  }

  set _image(value: String) {
    this.image = value;
  }

  constructor(){
  }

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _itemName(): string {
    return this.itemName;
  }

  set _itemName(value: string) {
    this.itemName = value;
  }
  get _description(): string {
    return this.description;
  }

  set _description(value: string) {
    this.description = value;
  }
  get _quantity(): number {
    return this.quantity;
  }

  set _quantity(value: number) {
    this.quantity = value;
  }

  get _price(): number {
    return this.price;
  }

  set _price(value: number) {
    this.price = value;
  }
  get _userId(): number {
    return this.userId;
  }

  set _userId(value: number) {
    this.userId = value;
  }

  get _categoryId(): number {
    return this.categoryId;
  }

  set _categoryId(value: number) {
    this.categoryId = value;
  }

}
