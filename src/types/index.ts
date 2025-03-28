type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
type ItemTitle = string;
type ItemImage = string;
type ItemDescription = string;
type ItemPrice = number | null;
type ItemId = string;

// Слой модели
export interface ProductList{
  total: number;
  items: IProductItem[];
}

export interface IProductItem {
  id: ItemId;
  description: ItemDescription;
  image: ItemImage;
  title: ItemTitle;
  category: ItemCategory;
  price: ItemPrice;
}

export type PaymentMethod = 'online' | 'offline'

export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];

  checkOrderInputs(): boolean;
}

// Слой представления 
type Button = HTMLButtonElement;

export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export interface IProductItemView {
  render(data: IProductItem): HTMLElement;
}

type TotalPrice = number | null;

export interface IFormView {
	formElement: HTMLFormElement;
	formErrors: HTMLSpanElement;
  submitButton: HTMLButtonElement;
  
  toggleSubmitButton(enable: boolean): void;
	render() : HTMLFormElement;
}

export interface IOrderView extends IFormView {
  paymentOnlineButton: Button;
  paymentOfflineButton: Button;
  adressInput: HTMLInputElement;
  togglePaymentButton(isOnline: string): void;
}

export interface IContactsView extends IFormView {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
}

export interface IOrderSuccess extends IModal {
  total: number;
}; 