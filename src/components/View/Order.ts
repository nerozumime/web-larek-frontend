import { IFormView, IOrderView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class Form implements IFormView {
  formElement: HTMLFormElement;
  formErrors: HTMLSpanElement;
  submitButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement){
    this.formElement = template.content.querySelector(settings.form).cloneNode(true) as HTMLFormElement
    this.formErrors = this.formElement.querySelector(settings.formErrors);
    this.submitButton = this.formElement.querySelector(settings.submitFormButton);

    this.submitButton.addEventListener(settings.eventClick, (evt)=> evt.preventDefault());
  }

  toggleSubmitButton(enable: boolean): void {
    enable ? this.submitButton.removeAttribute('disabled') : this.submitButton.setAttribute('disabled', 'true');
  }

  render(): HTMLFormElement {
    return this.formElement;
  }
}

export class OrderView extends Form implements IOrderView {
  paymentOnlineButton: HTMLButtonElement;
  paymentOfflineButton: HTMLButtonElement;
  adressInput: HTMLInputElement;
  events: IEvents;

  constructor(template: HTMLTemplateElement, events: IEvents){
    super(template);
    this.events = events;
    this.paymentOnlineButton = this.formElement.querySelector(settings.paymentCard);
    this.paymentOfflineButton = this.formElement.querySelector(settings.paymentCash);
    this.adressInput = this.formElement.querySelector(settings.formInput);

    this.paymentOnlineButton.addEventListener(settings.eventClick, ()=> {
      this.events.emit(settings.eventOrderPayment, {payment: settings.paymentOnline});
    })

    this.paymentOfflineButton.addEventListener(settings.eventClick, ()=> {
      this.events.emit(settings.eventOrderPayment, {payment: settings.paymentOffline});
    })

    this.adressInput.addEventListener('input', ()=> this.events.emit('input:change', {type: 'adress', value: this.adressInput.value}));

    console.log(this.submitButton)
    this.submitButton.addEventListener(settings.eventClick, ()=> {
      console.log('следующая форма');
    })
  }

  togglePaymentButton(isOnline: string){
    if(isOnline === settings.paymentOnline) {
      this.paymentOfflineButton.classList.remove(settings.paymentButtonActive);
      this.paymentOnlineButton.classList.add(settings.paymentButtonActive);
    } else {
      this.paymentOnlineButton.classList.remove(settings.paymentButtonActive);
      this.paymentOfflineButton.classList.add(settings.paymentButtonActive);
    }
  }
}

export class Contacts extends Form implements IFormView {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;

  constructor(template: HTMLTemplateElement){
    super(template);
    this.emailInput = this.formElement.querySelector(settings.emailInput);
    this.phoneInput = this.formElement.querySelector(settings.phoneInput);
  }
}