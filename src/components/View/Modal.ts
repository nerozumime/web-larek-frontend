import { IModal } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class Modal implements IModal {
  closeButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  content: HTMLElement;
  modal: HTMLElement;
  
  constructor(modal: HTMLElement){
    this.modal = modal;
    this.content = this.modal.querySelector(settings.modalContent);
    this.closeButton = this.modal.querySelector(settings.modalCloseButton);
    this.closeButton.addEventListener('click', ()=> this.close());
    this.modal.addEventListener('click', ()=> this.close());
    this.content.addEventListener('click', (evt)=> evt.stopPropagation());
  }

  open(): void {
    this.modal.classList.add(settings.modalActive);
    console.log(this.modal)
  }
  close(): void {
    this.modal.classList.remove(settings.modalActive);
  }
}