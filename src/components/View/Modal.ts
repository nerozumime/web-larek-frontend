import { IModal } from "../../types";
import { settings } from "../../utils/constants";

class Modal implements IModal {
  closeButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  content: HTMLElement;
  modal: HTMLElement;
  
  constructor(modal: HTMLElement){
    this.modal = modal;
  }

  open(): void {
    this.modal.classList.add(settings.modalActive);
  }
  close(): void {
    this.modal.classList.remove(settings.modalActive);
  }
}