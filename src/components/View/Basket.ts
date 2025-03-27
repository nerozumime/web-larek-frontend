import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export interface IBasketView { 
  totalPrice: number;
  updateBasketCounter(counter: string): void;
  addProduct(product: HTMLElement): void;
  clearBasket(): void;
  render(): HTMLElement;
}

export class BasketView implements IBasketView {
  protected submitButton: HTMLButtonElement;
  protected basket: HTMLElement;
  protected events: IEvents;
  protected basketCounter: HTMLElement
  protected basketButton: HTMLButtonElement;
  protected basketList: HTMLUListElement;
  protected totalPriceElement: HTMLSpanElement; 

  constructor(basket: HTMLElement, basketButton: HTMLButtonElement, events: IEvents){
    this.basket = basket;
    this.events = events;
    this.basketButton = basketButton;
    this.basketCounter = basketButton.querySelector(settings.basketCounter);
    this.basketList = basket.querySelector(settings.basketList);
    this.totalPriceElement = basket.querySelector(settings.basketPrice);

    basketButton.addEventListener(settings.eventClick, ()=> this.events.emit(settings.eventBasketOpen))
    this.events.on(settings.eventBasketUpdate, (data: {count: number})=> {
      this.basketCounter.textContent = String(data.count);
    })
  }
  set totalPrice(total: number){
    this.totalPriceElement.textContent = String(total);
  }

  updateBasketCounter(counter: string): void{
    this.basketCounter.textContent = counter;
  }

  addProduct(product: HTMLElement): void {
    this.basketList.append(product);
  }

  clearBasket(): void {
    this.basketList.textContent = null;
  }

  render(): HTMLElement {
    return this.basket;
  }
}