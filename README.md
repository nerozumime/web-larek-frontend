# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/Model - папка с классами модели данных
- src/components/View - папка с классами слоя представления

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
  payment: PaymentMethod; // способ оплаты, используется для IOrderView
  email: Email; // почта, используется для IContactsView
  phone: PhoneNumber; // телефон, используется для IContactsView
  address: string; // адрес доставки, используется для IOrderView
  total: number; // итоговая стоимость, используется для модального окна при успешной оплате
}

interface IOrderModel extends IOrder { // модель заказа 
  checkOrderInputs(): boolean; // проверка заполненности полей payment и address
  checkContactsInputs(): boolean; // проверка заполненности полей email и phone
  isFieldValid(field: string): boolean; // проверка заполненности поля
  clearOrder(): void; // очистка заказа при успешном оформлении заказа 
  getOrderData(): IOrder; // возвращает данные о заказе
}

interface IBasket { // корзина товаров
	_items: Set<IProductItem>; // товары могут храниться только в одном экземпляре

	addProduct(item: IProductItem): void; // добавляет товар в корзину
	removeProduct(item: IProductItem): void; // удаляет товар из корзины
	getProductList(): Set<IProductItem>; // возвращает список товаров
  getProductIds(): string[]; // возвращает id всех товаров в корзине
  getProductsCount(): number; // возвращает количество товаров в корзине
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

interface IProductItemView { // карточка товара 
  constructor(ProductTemplate: HTMLTemplateElement, data: IProductItem): IProductItemView; // конструктор карточки
  render(): HTMLElement; // возвращает разметку карточки
}

// в зависимости от темплейта разный рендер и разное кол-во отображаемых данных
class ProductCardView implements IProductItemView { // базовый класс для CatalogueProduct и PreviewProduct
  static categoryColor: Record<string, string>; // цвет категории карточки (название: hex-код)

  protected itemElement: HTMLElement; // карточка товара
  protected image: HTMLImageElement; // изображение 
  protected title: HTMLElement; // название 
  protected category: HTMLSpanElement; // категория 
  protected price: HTMLSpanElement; // цена
  protected id: string; // id 
  protected events: IEvents; // карточка может генерировать события 
  
  protected init(itemElement: HTMLElement): void; // поиск всех элементов карточки
  protected setData(data: IProductItem); // устанавливает корректные значения каждому элементу карточки
  selectProduct(): void // выбирает товар ( товар находится в корзине )
  render(): HTMLElement; // возвращает разметку карточки
}

class CatalogueProduct extends ProductCardView implements IProductItemView {} // отображение карточки в каталоге товаров

class PreviewProduct extends ProductCardView implements IProductItemView { // используется для отображения карточки в модальном окне
  protected description: HTMLElement; // описание товара
  protected submitButton: HTMLButtonElement; // кнопка добавление товара в корзину
}

class BasketProduct implements IProductItemView { // используется для отображения карточки в корзине
  protected index: HTMLSpanElement; // индекс товара в корзине
  protected title: HTMLSpanElement; // название 
  protected price: HTMLSpanElement; // цена 
  protected deleteButton: HTMLButtonElement; // кнопка удаления товара из корзины
  protected itemElement: HTMLElement; // карточка товара
  protected events: IEvents; // карточка генерирует события

  protected setData(data: IProductItem, index: number) // устанавливает название карточки, ее позицию в корзине и цену
  render(): HTMLElement // возвращает разметку товара
}

interface IBasketView { // корзина 
  constructor(template: HTMLTemplateElement): IBasketView; // конструктор корзины
  totalPrice: number; // итоговая стоимость товаров
  submitButton: HTMLButtonElement; // кнопка самбита корзины открывает форму заказа

  updateBasketCounter(counter: string): void; // обновляет счетчик кол-ва товаров в корзине
  addProduct(product: HTMLElement): void; // добавляет товар в корзину
  toggleSubmitButton(enable: boolean): void; // переключает состояние кнопки оформление заказа
  clearBasket(): void; // очищает корзину
  render(): HTMLElement; // возвращает разметку корзины
}

interface IFormView { // интерфейс формы
	formElement: HTMLFormElement; // форма 
	submitButton: Button; // кнопка самбита формы
  formErrors: HTMLSpanElement; // ошибки формы 

  setError(error: string): void; // устанавливает ошибку формы
  toggleSubmitButton(enable: boolean): void; // переключает состояние кнопки сабмита формы
	render() : HTMLFormElement; // возвращает разметку формы
}

interface IOrderView extends IFormView { // форма выбора метода оплаты и указания адреса доставки
  paymentOnlineButton: HTMLButtonElement; // кнопка задания метода оплаты онлайн
  paymentOfflineButton: HTMLButtonElement; // кнопка задания метода оплаты при получении 
  adressInput: HTMLInputElement; // инпут содержащий адрес клиента
 
  togglePaymentButton(isOnline: string): void; // устанавливает метод оплаты 
}

interface IContactsView extends IFormView { // форма указания контактных данных
  emailInput: HTMLInputElement; // поле ввода адреса электронной почты 
  adressInput: HTMLInputElement; // поле ввода адреса доставки 
}

interface IOrderSuccess { // уведомлние об успешном завершении заказа
  success: HTMLElement; // разметка окна 
  successTotalPrice: HTMLElement; // итоговая стоимость товаров
  submitButton: HTMLButtonElement;  // кнопка сабмита 
  setTotalPrice(total: number): void; // устанавливает итоговую стоимость
  render(): HTMLElement; // возвращает разметку окна 
}
```
### EventEmmiter

Взаимодействие осуществляется за счет событий, генерируемых с помощью брокера событий EventEmitter из файла events.ts. 
События, которые могут быть использованы в приложении:

- 'modal:open'- открытие модального окна
- 'modal:close' - закрытие модального окна 
- 'product:preview' - открытие модального окна с карточкой товара 
- 'basket:open' - открытие модального окна с корзиной 
- 'basket:update' - обновление содержимого корзины
- 'basket:add' - добавление товара в корзину
- 'basket:remove'- удаление товара из корзины 
- 'basket:submit' - переход из корзины к оформлению заказа, октрытие модального окна с формой заказа
- 'order:payment' - установка способа оплаты 
- 'input:change' - изменение поля формы
- 'contacts:payment' - открытие модального окна с контактными данными 
- 'order:done' - открытие модального окна завершения оформления заказа 
- 'order:success' - закрытие модального окна успешного оформления заказа кнопкой сабмита 
- 'products:get' - получение товаров с сервера
- 'product:selected' - уведомляет о том, что товар в корзине
- 'product:remove' - удаление товара из корзины
