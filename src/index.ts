import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api, ApiPostMethods } from './components/base/api';
import { IProductItem, ProductList } from './types';
import { CatalogueProduct, PreviewProduct, BasketProduct} from './components/View/Product';
import { Modal } from './components/View/Modal'
import { IEvents, EventEmitter} from './components/base/events'
import { BasketView, IBasketView } from './components/View/Basket';
import { Basket } from './components/Model/Basket';

const itemCatalogueTemplate = document.querySelector(settings.cardCatalogueTemplate) as HTMLTemplateElement;
const itemPreviewTemplate = document.querySelector(settings.cardPreviewTemplate) as HTMLTemplateElement;
const itemBasketTemplate = document.querySelector(settings.cardBasketTemplate) as HTMLTemplateElement;
const modalTemplate = document.querySelector(settings.cardPreviewModal) as HTMLTemplateElement;
const basketTemplate = document.querySelector(settings.basketTemplate) as HTMLTemplateElement;

const basketElement = basketTemplate.content.querySelector(settings.basket).cloneNode(true) as HTMLElement;
const basketButton = document.querySelector(settings.basketButton) as HTMLButtonElement;
const gallery = document.querySelector(settings.gallery);
const page = document.querySelector(settings.page) as HTMLElement;

const ApiModel: Api = new Api(API_URL);
const Events: IEvents = new EventEmitter();
const BasketModel: Basket = new Basket(Events);
const ModalView: Modal = new Modal(modalTemplate, Events);
const BasketVisual: IBasketView = new BasketView(basketElement, basketButton, Events);

function getProductItems(): Promise<ProductList> {
  return ApiModel.get(settings.apiProducts)
  .then(data => data as ProductList)
}

function checkBasketButton(): void {
  if(BasketModel.getProductsCount() < 1){
    BasketVisual.toggleSubmitButton(false);
  } else {
    BasketVisual.toggleSubmitButton(true);
  }
}

getProductItems()
  .then(data => {
    const Products: IProductItem[] = data.items;
    Products.map(product => product.image = CDN_URL + product.image)
    // console.log(Products)
    Products.forEach(product => {
      const catalogueProductView = new CatalogueProduct(Events, itemCatalogueTemplate, product);
      gallery.append(catalogueProductView.render())
    })
  })

  // открытие модального окна 
  Events.on(settings.eventModalOpen, ()=> {
    page.classList.add(settings.stopScroll)
  })

  // закрытие модального окна
  Events.on(settings.eventModalClose, ()=> {
    page.classList.remove(settings.stopScroll)
  })

  // открытие корзины
  Events.on(settings.eventBasketOpen, ()=> {
    checkBasketButton()
    ModalView.content = BasketVisual.render();
    ModalView.open()
  })

  // нажатие по карточке товара
  Events.on(settings.eventProductPreview, product => {
    const data: IProductItem = product as IProductItem;
    ModalView.content = new PreviewProduct(Events, itemPreviewTemplate, data).render();
    ModalView.open()
  })
 
  // добавление товара в корзину 
  Events.on(settings.eventBasketAdd, data => {
    const product: IProductItem = data as IProductItem;
    BasketModel.addProduct(product);
  });

  // обновление корзины (удаление товара, добавление товара, очистка корзины)
  Events.on(settings.eventBasketUpdate, () => {
    checkBasketButton()
    BasketVisual.clearBasket();
    let currentIndex = 1;
    Array.from(BasketModel.getProductList()).forEach(product => {
      const basketProduct = new BasketProduct(Events, itemBasketTemplate, product, currentIndex);
      BasketVisual.addProduct(basketProduct.render());
      currentIndex++;
    })
    BasketVisual.totalPrice = BasketModel.getTotalPrice();
  });

  // начало оформления заказа
  Events.on(settings.eventBasketSubmit, () => {
    const price = BasketModel.getTotalPrice();
    console.log('start ' + price)
  });