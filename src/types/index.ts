type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
type ItemTitle = string;
type ItemImage = string;
type ItemDescription = string;
type ItemPrice = number | null;
type ItemId = string;

// Слой модели
export interface IApiModel {
  getProductItems(): Promise<IProductList>;
  postOrder(order: IOrder): Promise<IOrderResponse>;
}

export interface IProductList{
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
  selected: boolean;
}

export type PaymentMethod = 'online' | 'offline'

export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderModel extends IOrder {
  checkOrderInputs(): boolean;
  checkContactsInputs(): boolean;
  isFieldValid(field: string): boolean;
  clearOrder(): void;
  getOrderData(): IOrder;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

// Слой представления 
export interface IPage {
  disableScroll(): void;
  enableScroll(): void;
}

export interface IModal {
  content: HTMLElement;
  open(): void;
  close(): void;
}

export interface IProductItemView {
  render(data: IProductItem): HTMLElement;
}

export interface IFormView {
	formElement: HTMLFormElement;
	formErrors: HTMLSpanElement;
  submitButton: HTMLButtonElement;
  
  setError(error: string): void;
  toggleSubmitButton(enable: boolean): void;
	render(): HTMLFormElement;
}

export interface IOrderView extends IFormView {
  paymentOnlineButton: HTMLButtonElement;
  paymentOfflineButton: HTMLButtonElement;
  adressInput: HTMLInputElement;
  togglePaymentButton(isOnline: string): void;
}

export interface IContactsView extends IFormView {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
}

export interface IOrderSuccess {
  success: HTMLElement;
  successTotalPrice: HTMLElement;
  submitButton: HTMLButtonElement; 
  setTotalPrice(total: number): void;
  render(): HTMLElement;
}
