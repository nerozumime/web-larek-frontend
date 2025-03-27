import { IModal } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class Modal implements IModal {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement;
  protected modal: HTMLElement;
  protected container: HTMLElement;
  protected page: HTMLElement;

  constructor(modal: HTMLElement, page: HTMLElement){
    this.page = page;
    this.modal = modal;
    this.container = this.modal.querySelector(settings.modalContainer);
    this._content = this.modal.querySelector(settings.modalContent);
    this.closeButton = this.modal.querySelector(settings.modalCloseButton);

    this.closeButton.addEventListener(settings.eventClick, ()=> this.close());
    this.modal.addEventListener(settings.eventClick, ()=> this.close());
    this.container.addEventListener(settings.eventClick, (evt)=> evt.stopPropagation());
  }

  set content(content: HTMLElement){
    this._content.replaceChildren(content);
  }

  open(): void {
    this.page.classList.add(settings.stopScroll)
    this.modal.classList.add(settings.modalActive);
  }
  close(): void {
    this.page.classList.remove(settings.stopScroll)
    this.modal.classList.remove(settings.modalActive);
    this.content = null;
  }
}