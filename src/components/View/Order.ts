import { IFormView, IOrderView } from "../../types";
import { settings } from "../../utils/constants";

export class Form implements IFormView {
  formElement: HTMLFormElement;
  formErrors: HTMLSpanElement;
  submitButton: HTMLButtonElement;
  constructor(template: HTMLTemplateElement){
    this.formElement = template.content.querySelector(settings.form).cloneNode(true) as HTMLFormElement
    this.formErrors = this.formElement.querySelector(settings.formErrors);
    this.submitButton = this.formElement.querySelector(settings.submitButton);
  }

  render(): HTMLFormElement {
    return this.formElement;
  }
}

export class Order extends Form implements IOrderView {
  paymentOnlineButton: HTMLButtonElement;
  paymentOfflineButton: HTMLButtonElement;
  adressInput: HTMLInputElement;

  constructor(template: HTMLTemplateElement){
    super(template);
    this.paymentOnlineButton = this.formElement.querySelector(settings.paymentCard);
    this.paymentOfflineButton = this.formElement.querySelector(settings.paymentCash);
    this.adressInput = this.formElement.querySelector(settings.formInput);

    this.paymentOnlineButton.addEventListener(settings.eventClick, ()=> {
      this.paymentOfflineButton.classList.remove('button_alt-active');
      this.paymentOnlineButton.classList.add('button_alt-active');
    })

    this.paymentOfflineButton.addEventListener(settings.eventClick, ()=> {
      this.paymentOnlineButton.classList.remove('button_alt-active');
      this.paymentOfflineButton.classList.add('button_alt-active');
    })
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