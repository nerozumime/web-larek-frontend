import { IProductItem, IProductItemView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

class ProductCardView implements IProductItemView {
  protected itemElement: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLSpanElement;
  protected price: HTMLSpanElement;
  protected id: string;

  init(itemElement: HTMLElement): void {
    this.image = itemElement.querySelector(settings.cardImage);
    this.title = itemElement.querySelector(settings.cardTitle);
    this.category = itemElement.querySelector(settings.cardCategory);
    this.price = itemElement.querySelector(settings.cardPrice);
  }

  render(data: IProductItem): HTMLElement {
    this.image.src = data.image;
    this.title.textContent = data.title; 
    this.category.textContent = data.category;
    this.price.textContent = String(data.price ? data.price : 'Бесценно');
    this.id = data.id;
    return this.itemElement;
  }
}

export class CatalogueProduct extends ProductCardView implements IProductItemView {
  static categoryColor: Record<string, string> = {
    'софт-скил': '#83FA9D',
    'другое': '#FAD883',
    'дополнительное': '#B783FA', 
    'кнопка': '#83DDFA',
    'хард-скил' : '#FAA083'
  }

  constructor(ProductTemplate: HTMLTemplateElement){
    super();
    this.itemElement = ProductTemplate.content.querySelector(settings.cardCatalogue).cloneNode(true) as HTMLElement;
    this.init(this.itemElement);
  }

  render(data: IProductItem): HTMLElement {
    super.render(data);
    this.category.style.background = CatalogueProduct.categoryColor[data.category];
    return this.itemElement;
  }
}

export class PreviewProduct extends ProductCardView implements IProductItemView {
  protected description: HTMLElement;

  constructor(ProductTemplate: HTMLTemplateElement){
    super();
    this.itemElement = ProductTemplate.content.querySelector(settings.cardPreview).cloneNode(true) as HTMLElement;
    this.init(this.itemElement);
    this.description = this.itemElement.querySelector(settings.cardDescription);
  }

  render(data: IProductItem): HTMLElement {
    super.render(data);
    this.description = this.description;
    return this.itemElement;
  }
}