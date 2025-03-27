import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

interface IBasket {
	_items: Set<IProductItem>;
	addProduct(item: IProductItem): void;
	removeProduct(item: IProductItem): void;
	getProductList(): Set<IProductItem>;
  getTotalPrice(): number;
  clearBasket(): void;
}

export class Basket implements IBasket {
  _items: Set<IProductItem> = new Set();
  events: IEvents;
  constructor(events: IEvents){
    this.events = events;
  }

  addProduct(item: IProductItem): void {
    this._items.add(item);
    this.events.emit('basket:update', {count: this.getProductsCount()});
  }

  removeProduct(item: IProductItem): void {
    this._items.delete(item);
    this.events.emit('basket:update', {count: this.getProductsCount()});
  }

  getProductList(): Set<IProductItem> {
    return this._items;
  }

  getProductsCount(): number {
    return this._items.size;
  }

  getTotalPrice(): number {
    let total: number = 0;
    this._items.forEach(product => {
      total += product.price;
    })
    return total;
  }

  clearBasket(): void {
    this._items.clear();
    this.events.emit('basket:update', {count: this.getProductsCount()});
  }
}