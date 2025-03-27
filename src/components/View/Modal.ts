import { IModal } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class Modal implements IModal {
  closeButton: HTMLButtonElement;
  _content: HTMLElement;
  modal: HTMLElement;
  container: HTMLElement;
  
  constructor(modal: HTMLElement){
    this.modal = modal;
    this.container = this.modal.querySelector(settings.modalContainer);
    this._content = this.modal.querySelector(settings.modalContent);
    this.closeButton = this.modal.querySelector(settings.modalCloseButton);

    this.closeButton.addEventListener('click', ()=> this.close());
    this.modal.addEventListener('click', ()=> this.close());
    this.container.addEventListener('click', (evt)=> evt.stopPropagation());
  }

  set content(content: HTMLElement){
    this._content.replaceChildren(content);
  }

  open(): void {
    this.modal.classList.add(settings.modalActive);
  }
  close(): void {
    this.modal.classList.remove(settings.modalActive);
    this.content = null;
  }
}