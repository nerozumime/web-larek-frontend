import { IProductItem, IProductList } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class ProductModel implements IProductList {
  total: number;
  _items: IProductItem[];

  constructor(protected events: IEvents){

  }

  set items(items: IProductItem[]){
    this._items = items;
    this.events.emit(settings.eventGetProducts);
  }
  
  get items(){
    return this._items;
  }
}