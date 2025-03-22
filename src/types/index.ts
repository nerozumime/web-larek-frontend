type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'
type ItemTitle = string;
type ItemImage = string;
type ItemDescription = string;
type ItemPrice = number | string;
type ItemId = number;

interface IItem {
  category: ItemCategory;
  title: ItemTitle;
  image: ItemImage;
  price: ItemPrice;
  description: ItemDescription;
  id: ItemId;
}

type ButtonElement = HTMLButtonElement;

type TotalPrice = number | null;

interface IBasket {
  items: IItem[];
  totalPrice: TotalPrice;
}

type PaymentMethod = 'Онлайн' | 'При получении'
type Email = string;
type PhoneNumber = string;

interface IOrder {
  paymentMethod: PaymentMethod;
  shipAdress: string;
  email: Email;
  phoneNumber: PhoneNumber;
}

type InputElement = HTMLInputElement;

interface IAppStateManager {
  items: IItem[];
  basket: IBasket;
  order: IOrder;


  initItems(items: IItem[]): void;
  
  addItemToBasket(id: ItemId): void;
  removeItemFromBasket(id: ItemId) : void;
  getBasketItemsCount(): number;
  makeOrder(): void;
  getTotalPrice(): TotalPrice;
  clearBasket(): void;

  setPaymentMethod(paymentMethod: PaymentMethod): void;
  setOrderInputValue(input: InputElement): void;
}