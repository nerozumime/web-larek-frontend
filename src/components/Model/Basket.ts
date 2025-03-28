import { IProductItem } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export interface IBasket {
	_items: Set<IProductItem>;
	addProduct(item: IProductItem): void;
	removeProduct(item: IProductItem): void;
	getProductList(): Set<IProductItem>;
  getProductsCount(): number;
  getTotalPrice(): number;
  getProductIds(): string[];
  clearBasket(): void;
}

export class Basket implements IBasket {
  _items: Set<IProductItem> = new Set();
  events: IEvents;
  constructor(events: IEvents){
    this.events = events;
    this.events.on(settings.eventBasketRemove, data => {
      const product: IProductItem = data as IProductItem;
      this.removeProduct(product);
    })
  }

  addProduct(item: IProductItem): void {
    this._items.add(item);
    this.events.emit(settings.eventBasketUpdate, {count: this.getProductsCount()});
  }

  removeProduct(item: IProductItem): void {
    this._items.delete(item);
    this.events.emit(settings.eventBasketUpdate, {count: this.getProductsCount()});
  }

  getProductList(): Set<IProductItem> {
    return this._items;
  }
  
  getProductIds(): string[] {
    return Array.from(this._items).map(product => {
      return product.id;
    })
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
    this.events.emit(settings.eventBasketUpdate, {count: this.getProductsCount()});
  }
}