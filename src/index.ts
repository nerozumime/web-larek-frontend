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

const ApiModel: Api = new Api(API_URL);
const Events: IEvents = new EventEmitter();
const BasketModel: Basket = new Basket(Events);
const ModalView: Modal = new Modal(modalTemplate);
const basketView: IBasketView = new BasketView(basketElement, basketButton, Events);

function getProductItems(): Promise<ProductList> {
  return ApiModel.get(settings.apiProducts)
  .then(data => data as ProductList)
}

getProductItems()
  .then(data => {
    const Products: IProductItem[] = data.items;
    Products.map(product => product.image = CDN_URL + product.image)
    console.log(Products)
    Products.forEach(product => {
      const catalogueProductView = new CatalogueProduct(Events, itemCatalogueTemplate, product);
      gallery.append(catalogueProductView.render())
    })
  })

  Events.on('basket:open', ()=> {
    ModalView.content = basketView.render();
    ModalView.open()
  })

  Events.on('product:preview', product => {
    const data: IProductItem = product as IProductItem;
    ModalView.content = new PreviewProduct(Events, itemPreviewTemplate, data).render();
    ModalView.open()
  })
 
  Events.on('basket:add', data => {
    const product: IProductItem = data as IProductItem;
    BasketModel.addProduct(product);
  });

  Events.on('basket:update', data => {
    basketView.clearBasket();
    Array.from(BasketModel.getProductList()).forEach(product => {
      const basketProduct = new BasketProduct(Events, itemBasketTemplate, product);
      basketView.addProduct(basketProduct.render());
    })
    basketView.totalPrice = BasketModel.getTotalPrice();
  });
