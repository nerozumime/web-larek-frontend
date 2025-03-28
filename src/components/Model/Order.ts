import { IOrder } from "../../types";

export class Order implements IOrder {
  payment: 'online' | 'offline';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];

  checkOrderInputs(): boolean {
    return this.isFieldValid(this.payment) && this.isFieldValid(this.address);
  }

  checkContactsInputs(): boolean {
    return this.isFieldValid(this.email) && this.isFieldValid(this.phone);
  }

  isFieldValid(field: string): boolean {
    return field !== undefined && field !== '';
  }

  clearOrder(): void {
    this.total = 0;
    this.items = [];
  }
}