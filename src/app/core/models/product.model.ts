export class Product {
  public id: string;
  public quantity: number;
  public floor: number;
  public section: number;

  constructor(id?: string, quantity?: number, floor?: number, section?: number) {
    this.id = id;
    this.quantity = quantity;
    this.floor = floor;
    this.section = section;
  }
}
