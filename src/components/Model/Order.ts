import { IOrder } from "../../types";

export class Order implements IOrder {
  payment: 'online' | 'offline';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];

  checkOrderInputs(): boolean {
    return this.payment !== undefined && this.address !== '' && this.address !== undefined;
  }
}