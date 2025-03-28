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

  constructor(template: HTMLTemplateElement, basketButton: HTMLButtonElement, events: IEvents){
    this.basket = template.content.querySelector(settings.basket).cloneNode(true) as HTMLElement;
    this.events = events;
    this.basketButton = basketButton;
    this.basketCounter = basketButton.querySelector(settings.basketCounter);
    this.basketList = this.basket.querySelector(settings.basketList);
    this.totalPriceElement = this.basket.querySelector(settings.basketPrice);
    this.submitButton = this.basket.querySelector(settings.submitButton);

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
    enable ? this.submitButton.disabled = false : this.submitButton.disabled = true;
  }

  clearBasket(): void {
    this.basketList.textContent = null;
  }

  render(): HTMLElement {
    return this.basket;
  }
}