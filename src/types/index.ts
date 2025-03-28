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

type PaymentMethod = 'online' | 'offline'

export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Слой представления 
type Button = HTMLButtonElement;

export interface IModal {
  content: HTMLElement;
  open(content: HTMLElement): void;
  close(): void;
}

export interface IProductItemView {
  render(data: IProductItem): HTMLElement;
}

type TotalPrice = number | null;

export interface IFormView{
	formElement: HTMLFormElement;
	submitButton: Button;

	render() : HTMLFormElement;
	setValue(input: HTMLInputElement, data: string): void;
	getValue(input: HTMLInputElement): string;
  clearValue(input: HTMLInputElement): void;
}

export interface IOrderView extends IFormView {
  paymentOnlineButton: Button;
  paymentOfflineButton: Button;
  adressInput: HTMLInputElement;

  setOnlinePayment(): void;
  setOfflinePayment(): void;
}

export interface IContactsView extends IFormView {
  emailInput: HTMLInputElement;
  adressInput: HTMLInputElement;
}

export interface IOrderSuccess extends IModal {
  total: number;
}; 