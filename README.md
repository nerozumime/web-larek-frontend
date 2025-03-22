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

## Классы модели

### IItem 
`Товар каталога`
```ts
interface IItem {
  category: ItemCategory; // категория товара
  title: ItemTitle; // название товара 
  image: ItemImage; // изображение товара
  price: ItemPrice; // цена товара 
  description: ItemDescription; // описание товара 
  id: ItemId; // уникальный id товара, по которому будет происходить удаление из корзины
}
```

### IOrder 
`Поля для отправки на сервер при успешном оформлении заказа`
```ts
interface IOrder {
  paymentMethod: PaymentMethod; // метод оплаты
  shipAdress: string; // адрес доставки
  email: Email; // почта получателя
  phoneNumber: PhoneNumber; // номер телефона получателя
}
```

## Презентер

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


### IAppStateManager
`Презентер - обрабатывает пользовательский ввод и управляет моделью и представлением`
```ts
interface IAppStateManager {
  items: IItem[]; // массив товаров
  basket: IBasket; // корзина
  order: IOrder; // заказ


  initItems(items: IItem[]): void; // инициализируем товары при загрузке страницы
  
  addItemToBasket(id: ItemId): void; // добавляет товар в корзину
  removeItemFromBasket(id: ItemId) : void; // удаляет товар из корзины 
  getBasketItemsCount(): number; // получает кол-во товаров в корзине
  makeOrder(): void; // из корзины попадаем в форму заказа 
  getTotalPrice(): TotalPrice; // общая стоимость покупок в корзине
  clearBasket(): void; // очищаем корзину после удачной покупки

  setPaymentMethod(paymentMethod: PaymentMethod): void; // устанавливает способ оплаты
  setOrderInputValue(input: InputElement): void; // устанавливает в модели данных значение поля из модели отображения
}
```
