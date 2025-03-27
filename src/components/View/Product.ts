import { IProductItem, IProductItemView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

class ProductCardView implements IProductItemView {
  static categoryColor: Record<string, string> = {
    'софт-скил': '#83FA9D',
    'другое': '#FAD883',
    'дополнительное': '#B783FA', 
    'кнопка': '#83DDFA',
    'хард-скил' : '#FAA083'
  }

  protected itemElement: HTMLElement;
  protected image: HTMLImageElement;
  protected title: HTMLElement;
  protected category: HTMLSpanElement;
  protected price: HTMLSpanElement;
  protected id: string;

  protected events: IEvents;
  
  constructor(events: IEvents){
    this.events = events;
  }

  init(itemElement: HTMLElement): void {
    this.image = itemElement.querySelector(settings.cardImage);
    this.title = itemElement.querySelector(settings.cardTitle);
    this.category = itemElement.querySelector(settings.cardCategory);
    this.price = itemElement.querySelector(settings.cardPrice);
  }

  setData(data: IProductItem){
    this.image.src = data.image;
    this.title.textContent = data.title; 
    this.category.textContent = data.category;
    this.price.textContent = String(data.price ? data.price : 'Бесценно');
    this.id = data.id;
    this.category.style.background = ProductCardView.categoryColor[data.category];
  }

  render(): HTMLElement {
    return this.itemElement;
  }
}

export class CatalogueProduct extends ProductCardView implements IProductItemView {
  constructor(events: IEvents, ProductTemplate: HTMLTemplateElement, data: IProductItem){
    super(events);
    this.itemElement = ProductTemplate.content.querySelector(settings.cardCatalogue).cloneNode(true) as HTMLElement;
    this.init(this.itemElement);
    this.setData(data);
    this.itemElement.addEventListener(settings.eventClick, ()=> this.events.emit('product:preview', data));
  }
}

export class PreviewProduct extends ProductCardView implements IProductItemView {
  protected description: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(events: IEvents, ProductTemplate: HTMLTemplateElement, data: IProductItem){
    super(events);
    this.itemElement = ProductTemplate.content.querySelector(settings.cardPreview).cloneNode(true) as HTMLElement;
    this.description = this.itemElement.querySelector(settings.cardDescription);
    this.submitButton = this.itemElement.querySelector(settings.submitButton);
    this.init(this.itemElement);
    this.setData(data);
    this.description.textContent = data.description;

    this.submitButton.addEventListener(settings.eventClick, ()=> this.events.emit('basket:add', data));
  }
}