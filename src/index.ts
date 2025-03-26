import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api, ApiPostMethods } from './components/base/api';
import { IProductItem, ProductList } from './types';
import { CatalogueCard } from './components/View/CatalogueCard';

const itemCatalogueTemplate = document.querySelector(settings.cardCatalogueTemplate) as HTMLTemplateElement;
console.log(itemCatalogueTemplate.content.cloneNode(true) as HTMLElement)
const gallery = document.querySelector(settings.gallery);
const ApiModel: Api = new Api(API_URL);

function getProductItems(): Promise<ProductList> {
  return ApiModel.get('/product')
  .then(data => data as ProductList)
}

getProductItems()
  .then(data => {
    const Products: IProductItem[] = data.items;
    Products.map(item => item.image = CDN_URL + item.image)
    console.log(Products)
    Products.forEach(product => {
      const item = new CatalogueCard(itemCatalogueTemplate);
      gallery.append(item.render(product))
    })
  })




