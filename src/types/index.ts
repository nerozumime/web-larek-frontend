type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
type ItemTitle = string;
type ItemImage = string;
type ItemDescription = string;
type ItemPrice = number | string;
type ItemId = string;

// Слой модели
interface ProductList{
  total: number;
  items: IProductItem[];
}

interface IProductItem {
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

interface IOrder {
  payment: PaymentMethod;
  email: Email;
  phone: PhoneNumber;
  address: string;
  total: number;
  items: ItemIds;
}

interface IBasket {
	_items: IProductItem[];

	addItemToBasket(item: IProductItem): void;
	removeItemFromBasket(id: string): void;
	getProductList(): IProductItem[];
  getTotalPrice(): number;
  clearBasket(): void;
}

interface IOrderSuccess extends IOrder {}; 

// Слой представления 
type Button = HTMLButtonElement;

export interface IModal {
  closeButton: Button;
  submitButton: Button;
  content: HTMLElement;
  open(): void;
  close(): void;
}

interface IProductItemView {
  new(ProductTemplate: HTMLTemplateElement, data: IProductItem): IProductItemView;
  render(): HTMLElement;
}

// в зависимости от темплейта разный рендер и разное кол-во отображаемых данных
class IProductCatalogue implements IProductItemView {}
class IProductPreview implements IProductItemView {}
class IProductBasket implements IProductItemView {}

type TotalPrice = number | null;

interface IBasketView {
  _items: IProductItemView[];
  _totalPrice: TotalPrice;
  submitButton: Button;
  closeButton: Button;

  new(template: HTMLTemplateElement): IBasketView;
  set items(items: HTMLElement[]);
  set totalPrice(total: number);
  render(): HTMLElement;
}

interface IFormView{
	formElement: HTMLFormElement;
	submitButton: Button;
  closeButton: Button;

	render() : HTMLFormElement;
	setValue(input: HTMLInputElement, data: string): void;
	getValue(input: HTMLInputElement): string;
  clearValue(input: HTMLInputElement): void;
}

interface IOrderView extends IFormView {
  paymentOnlineButton: Button;
  paymentOfflineButton: Button;
  adressInput: HTMLInputElement;

  setOnlinePayment(): void;
  setOfflinePayment(): void;
}

interface IContactsView extends IFormView {
  emailInput: HTMLInputElement;
  adressInput: HTMLInputElement;
}