import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export interface IBasketView {
  _items: HTMLElement[];
  totalPriceElement: HTMLSpanElement; 
  submitButton: HTMLButtonElement;

  clearBasket(): void;
  addProduct(product: HTMLElement): void;
  set items(items: HTMLElement[]);
  set totalPrice(total: number);
  render(): HTMLElement;
}


export class BasketView implements IBasketView {
  _items: HTMLElement[];
  submitButton: HTMLButtonElement;
  basket: HTMLElement;
  events: IEvents;
  basketCounter: HTMLElement
  basketButton: HTMLButtonElement;
  basketList: HTMLUListElement;
  totalPriceElement: HTMLSpanElement; 

  constructor(basket: HTMLElement, basketButton: HTMLButtonElement, events: IEvents){
    this.basket = basket;
    this.events = events;
    this.basketButton = basketButton;
    this.basketCounter = basketButton.querySelector(settings.basketCounter);
    this.basketList = basket.querySelector('.basket__list');
    this.totalPriceElement = basket.querySelector('.basket__price');
    console.log(basket)
    basketButton.addEventListener(settings.eventClick, ()=> this.events.emit('basket:open'))
    this.events.on('basket:update', (data: {count: number})=> {
      this.basketCounter.textContent = String(data.count);
    })
  }

  updateBasketCounter(counter: string){
    this.basketCounter.textContent = counter;
  }

  addProduct(product: HTMLElement): void {
    this.basketList.append(product);
  }

  clearBasket(): void {
    this.basketList.textContent = null;
  }

  set items(items: HTMLElement[]){
    this._items = items;
  }

  set totalPrice(total: number){
    this.totalPriceElement.textContent = String(total);
  }

  render(): HTMLElement {
    return this.basket;
  }
}