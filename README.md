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

	addItemToBasket(item: IProductItem): void; // добавляет товар в корзину
	removeItemFromBasket(id: string): void; // удаляет товар из корзины
	getProductList(): IProductItem[]; // возвращает список товаров
  getTotalPrice(): number; // возвращает итоговую стоимость товаров 
  clearBasket(): void; // очищает корзину при успешном заказе
}
```
### Слой представления 
```ts

export interface IModal { // модальное окно
  closeButton: Button; // кнопка закрытия есть у каждого модального окна
  submitButton: Button; // кнопка сабмита модального окна
  content: HTMLElement; // контент модального окна
  open(): void; // открывает модальное окно
  close(): void; // закрывает модальное окно
}

interface IProductItemViewConstructor{
  new(ProductTemplate: HTMLTemplateElement, data: IProductItem): IProductItemView; // конструктор карточки
}

interface IProductItemView { // карточка товара 
  render(): HTMLElement; // возвращает разметку карточки
}

// в зависимости от темплейта разный рендер и разное кол-во отображаемых данных
class IProductCatalogue implements IProductItemView {} // используется для отображения карточки в каталоге товаров
class IProductPreview implements IProductItemView {} // используется для отображения карточки в модальном окне
class IProductBasket implements IProductItemView {} // используется для отображения карточки в корзине

interface IBasketViewСonstructor{
  new(template: HTMLTemplateElement): IBasketView;
}

interface IBasketView { // корзина 
  _items: IProductItemView[]; // товары в корзине 
  _totalPrice: TotalPrice; // итоговая стоимость товаров
  submitButton: Button; // кнопка самбита корзины открывает форму заказа
  closeButton: Button; // кнопка закрытия корзины 

  set items(items: HTMLElement[]); // заполняет корзину товарами
  set totalPrice(total: number); // устанавливает общую стоимость 
  render(): HTMLElement; // возвращает разметку корзины
}

interface IFormView { // интерфейс формы
	formElement: HTMLFormElement; // форма 
	submitButton: Button; // кнопка самбита формы
  closeButton: Button; // кнопка закрытия формы

	render() : HTMLFormElement; // возвращает разметку формы
	setValue(input: HTMLInputElement, data: string): void; // устанавливает значение в поле ввода 
	getValue(input: HTMLInputElement): string; // получает значение из поля ввода
  clearValue(input: HTMLInputElement): void; // очищает поле ввода
}

interface IOrderView extends IFormView { // форма выбора метода оплаты и указания адреса доставки
  paymentOnlineButton: Button; // кнопка задания метода оплаты онлайн
  paymentOfflineButton: Button; // кнопка задания метода оплаты при получении 
  adressInput: HTMLInputElement; // инпут содержащий адрес клиента
 
  setOnlinePayment(): void; // устанавливает метод оплаты онлайн
  setOfflinePayment(): void; // устанавливает метод оплаты при получении 
}

interface IContactsView extends IFormView { // форма указания контактных данных
  emailInput: HTMLInputElement; // поле ввода адреса электронной почты 
  adressInput: HTMLInputElement; // поле ввода адреса доставки 
}

interface IOrderSuccessView extends IModal { // модальное окно завершения оплаты 
  _total: number; // общая стоимость покупок
  set total(total: number); // сеттер общей стоимости покупок
};
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

