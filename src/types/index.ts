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

type PaymentMethod = 'Онлайн' | 'При получении'
type Email = string;
type PhoneNumber = string;
type ItemIds = string[];

export interface IOrder {
  payment: PaymentMethod;
  email: Email;
  phone: PhoneNumber;
  address: string;
  total: number;
  items: ItemIds;
}

export interface IBasket {
	_items: IProductItem[];

	addItemToBasket(item: IProductItem): void;
	removeItemFromBasket(id: string): void;
	getProductList(): IProductItem[];
  getTotalPrice(): number;
  clearBasket(): void;
}


// Слой представления 
type Button = HTMLButtonElement;

export interface IModal {
  closeButton: Button;
  submitButton: Button;
  content: HTMLElement;
  open(): void;
  close(): void;
}

export interface IProductItemView {
  render(data: IProductItem): HTMLElement;
}

// в зависимости от темплейта разный рендер и разное кол-во отображаемых данных

//class ProductPreview implements IProductItemView {}
//class ProductBasket implements IProductItemView {}

type TotalPrice = number | null;

export interface IBasketView {
  _items: IProductItemView[];
  _totalPrice: TotalPrice;
  submitButton: Button;
  closeButton: Button;

  new(template: HTMLTemplateElement): IBasketView;
  set items(items: HTMLElement[]);
  set totalPrice(total: number);
  render(): HTMLElement;
}

export interface IFormView{
	formElement: HTMLFormElement;
	submitButton: Button;
  closeButton: Button;

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