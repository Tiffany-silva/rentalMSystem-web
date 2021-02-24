
export class Category {

  private id: number;
  private type: string='';

  constructor(){
  }

  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _type(): string {
    return this.type;
  }

  set _type(value: string) {
    this.type = value;
  }
}
