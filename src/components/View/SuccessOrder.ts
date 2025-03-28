import { IOrderSuccess } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class SuccessOrder implements IOrderSuccess{
  success: HTMLElement;
  successTotalPrice: HTMLElement;
  submitButton: HTMLButtonElement; 
  events: IEvents; 

  constructor(template: HTMLTemplateElement, events: IEvents){
    this.success = template.content.querySelector(settings.orderSuccess).cloneNode(true) as HTMLElement;
    this.successTotalPrice = this.success.querySelector(settings.orderDescription);
    this.submitButton = this.success.querySelector(settings.submitButton);
    this.events = events;
    this.submitButton.addEventListener(settings.eventClick, (evt)=> {
      evt.preventDefault();
      this.events.emit(settings.eventOrderSuccess)
    })
  }

  setTotalPrice(total: number): void {
    this.successTotalPrice.textContent = `Списано ${total} ${settings.currency}`;
  }

  render(): HTMLElement {
    return this.success;
  }
}