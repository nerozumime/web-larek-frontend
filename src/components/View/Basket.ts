import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export interface IBasketView { 
  totalPrice: number;
  updateBasketCounter(counter: string): void;
  addProduct(product: HTMLElement): void;
  toggleSubmitButton(enable: boolean): void;
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
    this.submitButton = basket.querySelector(settings.submitButton);

    basketButton.addEventListener(settings.eventClick, ()=> this.events.emit(settings.eventBasketOpen))
    this.events.on(settings.eventBasketUpdate, (data: {count: number})=> {
      this.basketCounter.textContent = String(data.count);
    })
    this.submitButton.addEventListener(settings.eventClick, ()=> {
      this.events.emit(settings.eventBasketSubmit);
    })
  }
  set totalPrice(total: number){
    this.totalPriceElement.textContent = String(total ? `${total} ${settings.currency}` : `0 ${settings.currency}`);
  }

  updateBasketCounter(counter: string): void{
    this.basketCounter.textContent = counter;
  }

  addProduct(product: HTMLElement): void {
    this.basketList.append(product);
  }

  toggleSubmitButton(enable: boolean): void {
    if(enable){
      this.submitButton.disabled = false;
    } else {
      this.submitButton.disabled = true;
    }
  }

  clearBasket(): void {
    this.basketList.textContent = null;
  }

  render(): HTMLElement {
    return this.basket;
  }
}