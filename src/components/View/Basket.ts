import { IBasketView } from "../../types";
import { settings } from "../../utils/constants";

export class BasketView implements IBasketView {
  _items: HTMLElement[];
  _totalPrice: number | null;
  submitButton: HTMLButtonElement;
  closeButton: HTMLButtonElement;
  basket: HTMLElement;

  constructor(basket: HTMLElement){
    this.basket = basket;
  }
  set items(items: HTMLElement[]){
    this._items = items;
  }
  set totalPrice(total: number){
    this._totalPrice = total;
  }
  render(): HTMLElement {
    return this.basket;
  }
}