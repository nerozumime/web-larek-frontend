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

## Интерфейсы. 

### IItem 
`Представляет собой товар каталога`
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
`Представляет собой форму заказа`
```ts
interface IOrder {
  paymentMethod: PaymentMethod; // метод оплаты
  shipAdress: string; // адрес доставки
  email: Email; // почта получателя
  phoneNumber: PhoneNumber; // номер телефона получателя
}
```

### IAppStateManager
`Менеджер событий, позволяющий понять, в какой состоянии находится сайт`
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
