# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура 
В проекте используется паттерн MVP (Model-View-Presenter).

MVP разделяет приложение на три компонента:
- Модель. Работает с данными, проводит вычисления и руководит всеми бизнес-процессами. 
- Представление. Показывает пользователю интерфейс и данные из модели. 
- Презентер. Служит прослойкой между моделью и представлением, обрабатывает пользовательский ввод и управляет моделью и представлением.

### Слой модели

```ts
interface ProductList{ // данные получаемые с сервера
  total: number; // количество товаров
  items: IProductItem[]; // массив данных товаров
}

interface IProductItem { // данные товара
  id: ItemId; // уникальный id 
  description: ItemDescription; // описание
  image: ItemImage; // ссылка на картинку 
  title: ItemTitle; // название 
  category: ItemCategory; // категория 
  price: ItemPrice; // цена может быть числом или строкой (Бесценно)
}

interface IOrder { // Данные оформления заказа
  payment?: PaymentMethod; // способ оплаты, используется для IOrderView
  email?: Email; // почта, используется для IContactsView
  phone?: PhoneNumber; // телефон, используется для IContactsView
  address?: string; // адрес доставки, используется для IOrderView
  total?: number; // итоговая стоимость, используется для модального окна при успешной оплате
}

interface IBasket { // корзина товаров
	_items: IProductItem[]; // товары 

	addItemToBasket(item: IProductItem): void;
	removeItemFromBasket(id: string): void;
	getProductList(): IProductItem[];
  getTotalPrice(): number;
  clearBasket(): void;
}

interface IOrderSuccess extends IOrder {}; 
```
### Слой представления 
```ts

export interface IModal { // модальное окно
  closeButton: Button;
  submitButton: Button;
  content: HTMLElement;
  open(): void;
  close(): void;
}

interface IProductItemView { // карточка товара 
  new(ProductTemplate: HTMLTemplateElement, data: IProductItem): IProductItemView;
  render(): HTMLElement;
}

// в зависимости от темплейта разный рендер и разное кол-во отображаемых данных
class IProductCatalogue implements IProductItemView {}
class IProductPreview implements IProductItemView {}
class IProductBasket implements IProductItemView {}

interface IBasketView { // корзина 
  _items: IProductItemView[]; // товары в корзине 
  _totalPrice: TotalPrice; // итоговая стоимость товаров
  submitButton: Button; 
  closeButton: Button;

  new(template: HTMLTemplateElement): IBasketView;
  set items(items: HTMLElement[]);
  set totalPrice(total: number);
  render(): HTMLElement;
}

interface IFormView { // интерфейс формы
	formElement: HTMLFormElement;
	submitButton: Button;
  closeButton: Button;

	render() : HTMLFormElement;
	setValue(input: HTMLInputElement, data: string): void;
	getValue(input: HTMLInputElement): string;
  clearValue(input: HTMLInputElement): void;
}

interface IOrderView extends IFormView { // форма выбора метода оплаты и указания адреса доставки
  paymentOnlineButton: Button;
  paymentOfflineButton: Button;
  adressInput: HTMLInputElement;

  setOnlinePayment(): void;
  setOfflinePayment(): void;
}

interface IContactsView extends IFormView { // форма указания контактных данных
  emailInput: HTMLInputElement;
  adressInput: HTMLInputElement;
}
```
### EventEmmiter

Взаимодействие осуществляется за счет событий, генерируемых с помощью брокера событий EventEmitter из файла events.ts. 
События, которые могут быть использованы в приложении:

- items:changed - отрисовывает товары при загрузке страницы
- basket:add - добавляет товар в корзину
- basket:remove - удаляет товар из корзины
- order:submit - завершает оформление заказа
- basket:clear - очищает корзину при успешном оформлении заказа 
- basket:open - открывает корзину 
- order:open - открывает модальное окно с оформлением заказа 
- modal:close - закрывает модальное окно 

