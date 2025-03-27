import { IBasketView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class BasketView implements IBasketView {
  _items: HTMLElement[];
  _totalPrice: number | null;
  submitButton: HTMLButtonElement;
  basket: HTMLElement;
  events: IEvents;
  basketCounter: HTMLElement
  basketButton: HTMLButtonElement;

  constructor(basket: HTMLElement, basketButton: HTMLButtonElement, events: IEvents){
    this.basket = basket;
    this.events = events;
    this.basketButton = basketButton;
    this.basketCounter = basketButton.querySelector(settings.basketCounter);

    basketButton.addEventListener(settings.eventClick, ()=> this.events.emit('basket:open'))
    this.events.on('basket:update', (data: {count: number})=> {
      this.basketCounter.textContent = String(data.count);
    })
  }

  updateBasketCounter(counter: string){
    this.basketCounter.textContent = counter;
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